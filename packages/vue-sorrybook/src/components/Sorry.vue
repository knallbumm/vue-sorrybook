<template>
  <div class="story" :class="{ vertical }">
    <div
      class="main"
      :style="{ [vertical ? 'width' : 'height']: `${resizeValue * 100}%` }"
    >
      <h2 v-if="title != null" class="title">{{ title }}</h2>
      <slot />
    </div>

    <Resizer
      v-if="!maximized"
      v-model="resizeValue"
      :type="vertical ? 'col' : 'row'"
    />

    <div
      v-if="(controls || controlGroups) && !maximized"
      class="addons"
      :style="{
        [vertical ? 'width' : 'height']: `${100 - resizeValue * 100}%`,
      }"
    >
      <div class="addon-tabbar">
        <AddonButton v-model="activeTab" name="Controls" value="controls" />
        <AddonButton
          v-if="events != null"
          v-model="activeTab"
          name="Events"
          value="events"
          :badge="events?.length || undefined"
        />
        <div class="spacer"></div>
        <button class="alignment-button" @click="vertical = !vertical">
          {{ vertical ? 'to bottom' : 'to right' }}
        </button>
      </div>

      <div v-if="activeTab === 'controls'" class="controls-addon">
        <ControlsAddon :controls="controls" :control-groups="controlGroups" />
      </div>
      <div v-if="activeTab === 'events'">
        <EventsAddon :events="events" @clear="emit('update:events', [])" />
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

import type { IControlGroup } from '../composables/useControlGroup'
import AddonButton from './addons/AddonButton.vue'
import ControlsAddon from './addons/ControlsAddon.vue'
import EventsAddon from './addons/EventsAddon.vue'
import Resizer from './Resizer.vue'

defineProps<{
  title?: string
  controlGroups?: {
    [groupName: string]: IControlGroup
  }
  controls?: IControlGroup
  events?: any[][]
  maximized?: boolean
}>()
const emit = defineEmits(['update:events'])

const activeTab = ref<'controls' | 'events'>('controls')

const vertical = useLocalStorage('sorrybook-vertical', true, {
  writeDefaults: false,
})
const resizeValue = useLocalStorage('sorrybook-resize-addons', 0.5)
</script>

<style lang="scss" scoped>
@use '../styles';

.title {
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
}

.story {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  align-items: stretch;

  &.vertical {
    flex-direction: row;
  }
}

.main {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 20px;
  overflow: auto;

  .vertical & {
    max-height: 100vh;
  }
}

.addons {
  border: 1px solid styles.$layout-border;
  border-width: 1px 0 0 0;
  overflow: auto;

  .vertical & {
    border-width: 0 0 0 1px;
    flex-grow: 1;
    max-height: 100vh;
    overflow: auto;
  }
}

.addon-tabbar {
  display: flex;
  border: 1px solid styles.$layout-border;
  border-width: 0 0 1px 0;
  background-color: styles.$light;
  padding: 0 0.5rem;

  .spacer {
    flex-grow: 1;
  }

  .alignment-button {
    @include styles.clean-button;
    text-transform: uppercase;
    font-size: 85%;
    padding: 0.3rem 0.5rem;
  }
}

.controls-addon {
  padding: 0.5rem;
}
</style>
