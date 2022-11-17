import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

export const useSorries = createSharedComposable(() => {
  const files = ref<string[]>([])
  if (import.meta.hot) {
    import.meta.hot.send('sorrybook:get-sorries')
    import.meta.hot.on('sorrybook:sorries', (data) => {
      files.value = data
    })
  }
  return files
})
