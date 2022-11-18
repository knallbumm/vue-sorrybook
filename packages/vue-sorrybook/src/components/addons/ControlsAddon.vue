<template>
  <ControlGroup :controls="controls" />

  <template v-if="controlGroups != null">
    <ControlGroup
      v-for="(group, name) in controlGroups"
      :key="name"
      :title="name"
      :controls="group"
    />
  </template>
</template>

<script setup lang="ts">
import { IControlGroup } from '../../composables/useControlGroup'
import ControlGroup from '../controls/ControlGroup.vue'

defineProps<{
  controls?: IControlGroup
  controlGroups?: {
    [name: string]: IControlGroup
  }
}>()
</script>
