<template>
  <textarea
    ref="htmlRef"
    v-model="viewJson"
    class="textarea"
    :class="{ error }"
    @focus="focus"
    @blur="blur"
    @input="resize"
  ></textarea>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { Replacer, Reviver } from '../../composables/useReplaceComponents'

const props = defineProps<{
  modelValue: any
  replacer?: Replacer
  reviver?: Reviver
}>()
const emit = defineEmits(['update:modelValue'])

const error = ref(false)
const htmlRef = ref<HTMLTextAreaElement | null>(null)
const modelJson = computed(() =>
  JSON.stringify(props.modelValue, props.replacer, 2)
)
const viewJson = ref(modelJson.value)

watch(modelJson, () => {
  viewJson.value = modelJson.value
  setTimeout(resize)
})

onMounted(resize)

function focus() {
  error.value = false
}

function blur() {
  if (htmlRef.value != null) {
    try {
      const parsed = JSON.parse(htmlRef.value.value, props.reviver)
      emit('update:modelValue', parsed)
      viewJson.value = JSON.stringify(parsed, props.replacer, 2)
      error.value = false
      setTimeout(resize)
    } catch {
      error.value = true
    }
  }
}

function resize() {
  if (htmlRef.value != null) {
    htmlRef.value.style.height = '30px'
    htmlRef.value.style.height = `${htmlRef.value.scrollHeight + 3}px`
  }
}
</script>

<style scoped lang="scss">
@use '../../styles';

.textarea {
  @include styles.input-transparent;
  width: 100%;
  font-family: Consolas, monospace;
  font-size: 85%;

  display: block;
  resize: none;
  overflow: auto;
  min-height: 30px;
  max-height: 300px;

  &.error {
    border-color: red;
  }

  .vertical & {
    max-height: 500px;
  }
}
</style>
