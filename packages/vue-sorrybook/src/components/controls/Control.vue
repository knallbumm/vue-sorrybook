<template>
  <template v-if="type === 'textarea'">
    <textarea v-model="value" class="text-input" />
  </template>

  <template v-else-if="typeof value === 'number'">
    <input v-model="value" class="number-input" type="number" :step="step" />
  </template>

  <template v-else-if="props.options != null">
    <select v-model="value" class="select">
      <option v-for="opt in props.options" :key="opt" :value="opt">
        {{ opt }}
      </option>
    </select>
  </template>

  <template v-else-if="typeof value === 'string'">
    <input v-model="value" class="text-input" type="text" />
  </template>

  <template v-else-if="typeof value === 'boolean'">
    <button class="bool" :class="{ active: value }" @click="value = true">
      True
    </button>
    <button class="bool" :class="{ active: !value }" @click="value = false">
      False
    </button>
  </template>

  <template v-else>
    <JsonControl v-model="value" :replacer="replacer" :reviver="reviver" />
  </template>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import { Replacer, Reviver } from '../../composables/useReplaceComponents'
import JsonControl from '../controls/JsonControl.vue'

const props = defineProps<{
  modelValue: any
  type?: 'textarea'
  options?: any[]
  step?: number
  replacer?: Replacer
  reviver?: Reviver
}>()
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit).value
</script>

<style scoped lang="scss">
@use '../../styles';

.bool {
  position: relative;
  border: 1px solid styles.$input-border;
  padding: 3px 20px 3px 10px;
  background-color: #ddd;
  border-radius: 50px 0 0 50px;
  color: #444;
  font-family: inherit;
  font-size: 90%;

  & + button {
    padding: 3px 10px 3px 20px;
    margin-left: -17px;
    border-radius: 0 50px 50px 0;
  }

  &.active {
    background-color: styles.$light;
    color: black;
    border-radius: 50px;
    padding: 3px 10px;
    z-index: 2;
  }
}

.text-input,
.number-input,
.select {
  @include styles.input;
  width: 250px;
  font-size: 90%;
}

textarea.text-input {
  width: 100%;
  resize: vertical;
}
</style>
