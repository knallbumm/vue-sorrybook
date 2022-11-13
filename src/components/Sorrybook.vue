<script setup lang="ts">
import { onKeyPressed, useLocalStorage } from '@vueuse/core'
import { computed, type Component } from 'vue'

import Resizer from './Resizer.vue'
import Tabs, { type ITabs } from './Tabs.vue'

const props = defineProps<{
  modelValue: string
  stories: Section
}>()
const emit = defineEmits(['update:modelValue'])

const path = computed({
  get() {
    return props.modelValue.split('.')
  },
  set(newValue: string[]) {
    emit('update:modelValue', newValue.join('.'))
  },
})

const tabs = computed(() => sectionToTabs(props.stories))
const selectedTab = computed(() => {
  let value: Section | Component = props.stories
  for (const sel of path.value) {
    value = (value as Section)[sel]
  }
  return value
})

function sectionToTabs(section: Section) {
  const result: ITabs = {}
  for (const key in section) {
    if ('render' in section[key]) {
      result[key] = true
    } else {
      result[key] = sectionToTabs(section[key] as Section)
    }
  }
  return result
}

const resizeValue = useLocalStorage(
  'sorrybook-resize-sidebar',
  300 / window.innerWidth
)

const isMaximized = useLocalStorage('sorrybook-maximized', false)
onKeyPressed('f', (e: KeyboardEvent) => {
  // don't trigger this while editing text
  if (e.target === document.body) {
    isMaximized.value = !isMaximized.value
  }
})
</script>

<script lang="ts">
interface Section {
  [name: string]: Section | Component
}
</script>

<template>
  <div class="sidebar">
    <div
      v-if="!isMaximized"
      class="left"
      :style="{ width: `${resizeValue * 100}%` }"
    >
      <Tabs v-model="path" :tabs="tabs" expanded-by-default />
    </div>
    <Resizer v-model="resizeValue" type="col" />
    <div
      v-if="path[1] != null"
      class="right"
      :style="{ width: `${100 - resizeValue * 100}%` }"
    >
      <component :is="selectedTab" :maximized="isMaximized"></component>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles';

.sidebar {
  display: flex;
  height: 100vh;

  .left {
    box-sizing: border-box;
    width: min(300px, 40vw);
    background-color: styles.$light;
    border-right: 1px solid styles.$layout-border;
    padding: 10px 0;
    overflow: auto;
  }

  .right {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex-grow: 1;
    max-height: 100vh;
    overflow: auto;
  }
}

.dragging .sidebar {
  user-select: none;
}
</style>

<style>
html,
body {
  margin: 0;
}
</style>
