<template>
  <div
    ref="elem"
    class="resizer"
    :class="type === 'row' ? 'row' : 'col'"
    @pointerdown="pointerDown"
  ></div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onKeyStroke, useEventListener } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  type: 'row' | 'col'
  modelValue: number
}>()
const emit = defineEmits(['update:modelValue'])

const isDown = ref(false)
const prevValue = ref(props.modelValue)
const elem = ref<HTMLDivElement>()

useEventListener(window, 'pointermove', pointerMove)
useEventListener(window, 'pointerup', pointerUp)
useEventListener(window, 'pointercancel', pointerCancel)
useEventListener(window, 'blur', pointerCancel)
onKeyStroke('Escape', pointerCancel)

function pointerDown() {
  isDown.value = true
  document.body.classList.add('dragging')
}

function pointerMove(e: MouseEvent) {
  if (isDown.value) {
    const parent = elem.value?.parentElement
    if (parent != null) {
      const rect = parent.getBoundingClientRect()
      const pos =
        props.type === 'col'
          ? (e.clientX - rect.left) / rect.width
          : (e.clientY - rect.top) / rect.height

      emit('update:modelValue', pos)
    }
  }
}

function pointerUp() {
  isDown.value = false
  document.body.classList.remove('dragging')
  prevValue.value = props.modelValue
}

function pointerCancel() {
  isDown.value = false
  document.body.classList.remove('dragging')
  emit('update:modelValue', prevValue.value)
}
</script>

<style lang="scss" scoped>
@use '../styles';

$color: #3a96ff;

.resizer {
  box-sizing: border-box;
  transition: opacity 0.25s 0.15s;
  opacity: 0;
  position: relative;
  z-index: 1;

  &:hover {
    opacity: 1;
  }

  &.col {
    width: 10px;
    margin: 0 -5px;
    cursor: col-resize;
    background: linear-gradient(
      to right,
      transparent 20%,
      $color 20%,
      $color 80%,
      transparent 80%
    );
  }

  &.row {
    height: 10px;
    margin: -5px 0;
    cursor: row-resize;
    background: linear-gradient(
      to bottom,
      transparent 20%,
      $color 20%,
      $color 80%,
      transparent 80%
    );
  }
}
</style>
