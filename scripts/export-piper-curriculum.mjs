import { createServer } from 'vite'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { VOCABULARY } = await server.ssrLoadModule('/src/data/curriculum.ts')
  process.stdout.write(JSON.stringify(VOCABULARY.filter((item) => item.id !== 'unreviewed-example').map(({ id, hungarian }) => ({ id, text: hungarian }))))
} finally { await server.close() }
