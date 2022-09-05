#!/usr/bin/env node
/* eslint-disable no-undef */
import vue from '@vitejs/plugin-vue'
import { cac } from 'cac'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'

const cli = cac('sorrybook')

cli
  .command('[root]', 'start sorrybook')
  .alias('dev')
  .alias('serve')
  .action(async () => {
    const __dirname = fileURLToPath(new URL('../sorrybook', import.meta.url))
    process.env['VITE_SORRYBOOK_ROOT_DIR'] = fileURLToPath(
      new URL('../../../src', import.meta.url)
    )
    const config = (await import('../../../sorrybook.config.js')).default
    console.info(config)
    process.env['VITE_SORRYBOOK_CONFIG'] = JSON.stringify(config)
    ;(async () => {
      const server = await createServer({
        root: __dirname,
        plugins: [vue()],
      })
      await server.listen()

      server.printUrls()
    })()
  })

cli.help()
cli.version('0.0.0')

cli.parse()
