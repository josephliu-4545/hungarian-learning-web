import { createServer } from 'vite'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { PREVIEW_VOCABULARY } = await server.ssrLoadModule('/src/data/curriculum.ts')
  process.stdout.write(JSON.stringify(PREVIEW_VOCABULARY.map(({ id, hungarian }) => ({ id, text: hungarian }))))
} finally { await server.close() }
