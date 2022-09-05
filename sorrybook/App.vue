<template>
  <Sorrybook v-model="model" :sorries="imports" />
</template>

<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { computed } from 'vue'

import { Sorrybook } from '../dist/sorrybook.js'
import { autoImportSorries } from './auto.import'

// // Stories
const imports = autoImportSorries()

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
