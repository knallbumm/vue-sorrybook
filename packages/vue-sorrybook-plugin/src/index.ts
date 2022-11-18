import glob from 'glob'
import type { Plugin } from 'vite'

export const vueSorrybookPlugin = (): Plugin => {
  return {
    name: 'vue-sorrybook-plugin',
    apply: 'serve',
    handleHotUpdate(ctx) {
      glob('src/**/*.sorry.vue', (er, files) => {
        ctx.server.ws.send(
          'sorrybook:sorries',
          files.map((file) => file.replace('src', '@'))
        )
      })
    },
    configureServer(server) {
      server.ws.on('sorrybook:get-sorries', (_, client) => {
        glob('src/**/*.sorry.vue', (er, files) => {
          client.send(
            'sorrybook:sorries',
            files.map((file) => file.replace('src', '@'))
          )
        })
      })
    },
  }
}
