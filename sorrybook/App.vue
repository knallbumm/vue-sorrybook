<template>
  <Sorrybook v-model="model" :sorries="components" />
</template>

<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { computed } from 'vue'

import { Sorrybook } from '../dist/sorrybook.js'
import { useSorries } from './composables/useSorries'

const sorries = useSorries()
const components = computed(() => {
  const imports = {}
  for (const path of sorries.value) {
    const splitPath = path.split('/')
    const fileName = splitPath[splitPath.length - 1]
    const tabName = fileName.split('.sorry.vue')[0]
    imports[tabName] = () => import(path)
  }
  return imports
})

const params = useUrlSearchParams<{ c: string }>('history')
const model = computed({
  get: () => params.c ?? '',
  set(newValue: string) {
    params.c = newValue
  },
})
</script>

<style lang="scss">
@import '../dist/style.css';
</style>
