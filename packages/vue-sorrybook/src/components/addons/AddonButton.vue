<template>
  <button
    class="addon-button"
    :class="{ active: value === modelValue }"
    @click="$emit('update:modelValue', value)"
  >
    {{ name }}
    <div v-if="badge != null" class="badge">
      {{ badge }}
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  value: string
  modelValue: string
  badge?: string | number
}>()
defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
@use '../../styles';

.addon-button {
  @include styles.clean-button;
  padding: 0.3rem 0.5rem;

  &.active {
    font-weight: bold;
  }
}

.badge {
  display: inline-block;
  margin-left: 0.2rem;
  background-color: #666;
  color: white;
  font-size: 85%;
  font-weight: normal;
  padding: 0 0.35rem;
  border-radius: 50px;
}
</style>
