import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile, copyFile, stat, rm } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'dist-beta')
const work = join(root, '.piper-work')
const sha = buffer => createHash('sha256').update(buffer).digest('hex')
const run = (file, args, capture = false) => execFileSync(process.execPath, [join(root, file), ...args], { cwd: root, encoding: 'utf8', stdio: capture ? ['ignore','pipe','inherit'] : 'inherit' })

function checkWav(bytes) {
  if (bytes.length < 44 || bytes.length > 8 * 1024 * 1024 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE' || bytes.readUInt32LE(4) + 8 !== bytes.length) return false
  let format = false, data = false
  for (let at = 12; at + 8 <= bytes.length;) {
    const type = bytes.toString('ascii', at, at + 4), size = bytes.readUInt32LE(at + 4), start = at + 8
    if (start + size > bytes.length) return false
    if (type === 'fmt ' && size >= 16) format = bytes.readUInt16LE(start) === 1 && bytes.readUInt16LE(start + 2) === 1 && bytes.readUInt32LE(start + 4) > 0 && bytes.readUInt16LE(start + 14) === 16
    if (type === 'data') data = size > 0 && size % 2 === 0
    at = start + size + size % 2
  }
  return format && data
}

async function main() {
  const items = JSON.parse(run('scripts/export-piper-curriculum.mjs', [], true))
  if (!Array.isArray(items) || !items.length || new Set(items.map(item=>item.id)).size !== items.length) throw Error('Invalid or duplicate curriculum IDs.')
  const entries = []
  const errors = []
  let total = 0
  for (const voice of ['anna','imre']) {
    const model = 'hu_HU-' + voice + '-medium'
    const modelHash = sha(await readFile(join(work,'models',model+'.onnx')))
    const configHash = sha(await readFile(join(work,'models',model+'.onnx.json')))
    for (const item of items) {
      if (!/^[a-z0-9-]+$/.test(item.id) || typeof item.text !== 'string' || !item.text.trim()) throw Error('Invalid vocabulary entry: ' + item.id)
      const stem = join(work,'curriculum-preview',voice,item.id)
      try {
        const meta = JSON.parse(await readFile(stem+'.json','utf8'))
        if (meta.text !== item.text || meta.voice !== model || meta.model_sha256 !== modelHash || meta.config_sha256 !== configHash || !meta.piper_version) throw Error('stale or mismatched metadata')
        const bytes = await readFile(stem+'.wav')
        if (!checkWav(bytes)) throw Error('invalid WAV')
        const path = 'audio-beta/'+voice+'/'+item.id+'.wav'
        entries.push({source:stem+'.wav',path,voice,id:item.id,text:item.text,sha256:sha(bytes),bytes:bytes.length,model,model_sha256:modelHash,config_sha256:configHash,piper_version:meta.piper_version})
        total += bytes.length
      } catch (err) { errors.push(voice+'/'+item.id+': '+err.message) }
    }
  }
  if (errors.length) {
    console.error(errors.slice(0,20).join('\n'))
    throw Error(errors.length+' clips missing/stale/invalid. Run scripts/generate-piper-curriculum.py first; no beta build was produced.')
  }
  console.log('Validated '+entries.length+' clips ('+(total/1048576).toFixed(1)+' MiB).')
  // Dedicated directory: never overwrite the normal reviewed build in dist/.
  try {
    run('node_modules/typescript/bin/tsc',['-b'])
    run('node_modules/vite/bin/vite.js',['build','--mode','beta','--outDir','dist-beta','--base','./','--emptyOutDir'])
    for (const entry of entries) {
      const dest = join(output,entry.path)
      await mkdir(dirname(dest),{recursive:true})
      await copyFile(entry.source,dest)
      if (sha(await readFile(dest)) !== entry.sha256) throw Error('Audio changed during packaging: '+entry.path)
    }
    await writeFile(join(output,'beta-audio-manifest.json'),JSON.stringify({status:'unreviewed-local-beta',recordings:entries.map(({source,...meta})=>meta)},null,2)+'\n')
    await writeFile(join(output,'BETA-README.txt'),'Magyar Learning beta. AI-assisted curriculum and synthetic audio; human language and audio review pending. For educational testing only. Redistribution rights must be confirmed before public hosting.\n')
    if (!(await stat(join(output,'index.html'))).isFile()) throw Error('Missing index.html')
    console.log('Beta ready: '+output+'\n'+items.length+' entries, '+entries.length+' audio clips.\nRun npm run preview:beta and open http://localhost:4173/')
  } catch (err) {
    await rm(output,{recursive:true,force:true})
    throw err
  }
}
main().catch(err=>{console.error(err.message);process.exitCode=1})
