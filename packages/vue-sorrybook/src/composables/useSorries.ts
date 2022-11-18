import { createSharedComposable } from '@vueuse/core'
import { AsyncComponentLoader, computed, ref } from 'vue'

export const useSorries = createSharedComposable(() => {
  const files = ref<string[]>([])
  if (import.meta.hot) {
    console.log('hello')
    import.meta.hot.send('sorrybook:get-sorries')
    import.meta.hot.on('sorrybook:sorries', (data) => {
      files.value = data
    })
  }

  const sorries = computed(() => {
    const imports: Record<string, AsyncComponentLoader> = {}
    for (const path of files.value) {
      const splitPath = path.split('/')
      const fileName = splitPath[splitPath.length - 1]
      const tabName = fileName.split('.sorry.vue')[0]
      imports[tabName] = () => import(path)
    }
    return imports
  })

  return sorries
})
