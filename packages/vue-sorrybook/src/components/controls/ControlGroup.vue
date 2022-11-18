<template>
  <button v-if="title != null" class="title" @click="minimized = !minimized">
    {{ title }}
  </button>
  <table v-if="!minimized" class="table">
    <tbody>
      <tr v-for="(control, key) in controls" :key="key">
        <td>{{ key }}</td>
        <td style="width: 100%">
          <Control
            v-model="control.value"
            :options="control.options"
            :type="control.type"
            :step="control.step"
            :replacer="control.replacer"
            :reviver="control.reviver"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue'

import type { IControlGroup } from '../../composables/useControlGroup'
import Control from './Control.vue'

defineProps<{
  title?: string | number
  controls?: IControlGroup
}>()

const minimized = ref(false)
</script>

<script lang="ts"></script>

<style scoped lang="scss">
.title {
  display: block;
  border: none;
  margin: 0.5rem;
  padding: 0;
  background-color: transparent;
  font: inherit;
  font-weight: bold;
  font-size: 105%;
  cursor: pointer;

  &:hover::after,
  &:focus::after {
    content: ' ›';
  }
}

.table {
  border-collapse: collapse;
  margin: 0.5rem;

  td {
    padding: 5px 0;

    &:first-child {
      padding-right: 15px;
      min-width: 130px;
    }
  }

  tr:first-child td {
    padding-top: 0;
  }

  tr:last-child td {
    padding-bottom: 0;
  }
}
</style>
