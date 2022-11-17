#!/usr/bin/env node
/* eslint-disable no-undef */
import vue from '@vitejs/plugin-vue'
import { cac } from 'cac'
import glob from 'glob'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'

const vueSorrybookPlugin = () => ({
  name: 'vue-sorrybook-plugin',
  apply: 'serve',
  handleHotUpdate(ctx) {
    const cwd = process.cwd()
    glob('src/**/*.sorry.vue', (er, files) => {
      ctx.server.ws.send(
        'sorrybook:sorries',
        files.map((file) => `${cwd}/${file}`)
      )
    })
  },
  configureServer(server) {
    const cwd = process.cwd()
    server.ws.on('sorrybook:get-sorries', (_, client) => {
      glob('src/**/*.sorry.vue', (er, files) => {
        client.send(
          'sorrybook:sorries',
          files.map((file) => `${cwd}/${file}`)
        )
      })
    })
  },
})

const cli = cac('sorrybook')

cli
  .command('[root]', 'start sorrybook')
  .alias('dev')
  .alias('serve')
  .action(async () => {
    const __dirname = fileURLToPath(new URL('../sorrybook', import.meta.url))
    // const config = (await import('../../../sorrybook.config.js')).default
    // console.info(config)

    const server = await createServer({
      root: __dirname,
      plugins: [vue(), vueSorrybookPlugin()],
      watch: {
        cwd: 'src',
      },
      server: {
        fs: {
          allow: ['../..'],
        },
      },
    })
    await server.listen()

    server.printUrls()
  })

cli.help()
cli.version('0.0.0')
cli.parse()
