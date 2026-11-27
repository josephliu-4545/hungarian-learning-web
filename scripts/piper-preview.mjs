import { readFileSync, statSync, createReadStream } from 'node:fs'
import { resolve } from 'node:path'

export function piperPreview() {
  return {
    name: 'magyar-piper-local-preview',
    apply: 'serve',
    configureServer(server) {
      if (server.config.isProduction) return
      const folder = resolve(server.config.root, '.piper-work', 'curriculum-preview')
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        if (!url.pathname.startsWith('/__piper_preview/')) return next()
        const match = /^\/__piper_preview\/(anna|imre)\/([a-z0-9-]+)\.wav$/.exec(url.pathname)
        const fail = (status) => { res.statusCode = status; res.end() }
        if (!match || !['GET', 'HEAD'].includes(req.method)) return fail(404)
        const [, voice, id] = match
        const stem = resolve(folder, voice, id)
        try {
          const metadata = JSON.parse(readFileSync(stem + '.json', 'utf8'))
          if (metadata.text !== url.searchParams.get('text') || metadata.voice !== 'hu_HU-' + voice + '-medium') return fail(404)
          const path = stem + '.wav'
          const size = statSync(path).size
          if (size <= 44 || size > 8 * 1024 * 1024) return fail(404)
          res.setHeader('Content-Type', 'audio/wav')
          res.setHeader('Cache-Control', 'no-store')
          res.setHeader('Accept-Ranges', 'bytes')
          let start = 0, end = size - 1
          if (req.headers.range) {
            const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range)
            if (!range || (!range[1] && !range[2])) { res.setHeader('Content-Range', 'bytes */' + size); return fail(416) }
            if (!range[1]) start = Math.max(0, size - Number(range[2]))
            else { start = Number(range[1]); if (range[2]) end = Math.min(end, Number(range[2])) }
            if (start > end || start >= size || !Number.isSafeInteger(start) || !Number.isSafeInteger(end)) { res.setHeader('Content-Range', 'bytes */' + size); return fail(416) }
            res.statusCode = 206
            res.setHeader('Content-Range', 'bytes ' + start + '-' + end + '/' + size)
          }
          res.setHeader('Content-Length', end - start + 1)
          if (req.method === 'HEAD') return res.end()
          const stream = createReadStream(path, { start, end })
          stream.on('error', () => res.destroy())
          res.on('close', () => stream.destroy())
          stream.pipe(res)
        } catch { fail(404) }
      })
    },
  }
}
