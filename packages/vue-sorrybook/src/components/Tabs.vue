<template>
  <template v-for="(tab, tabName) of props.tabs" :key="tabName">
    <template v-if="tab === true">
      <button
        class="tab"
        :class="{ active: isActive(tabName as string) }"
        @click="update([tabName as string])"
      >
        {{ tabName }}
      </button>
    </template>
    <template v-else>
      <button
        class="title"
        :class="{
          collapsed: collapsed[tabName],
          active: collapsed[tabName] && isActive(tabName as string),
        }"
        @click="collapsed[tabName] = !collapsed[tabName]"
      >
        {{ tabName }}
      </button>
      <div v-if="!collapsed[tabName]" class="section">
        <Tabs
          :tabs="tab"
          :model-value="modelValue?.slice(1)"
          @update:model-value="update([tabName as string, ...$event])"
        />
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

export interface ITabs {
  [key: string]: ITabs | true
}

const props = defineProps<{
  tabs: ITabs
  modelValue: string[] | undefined
  expandedByDefault?: true
}>()
const emit = defineEmits(['update:modelValue'])

function update(tabs: string[]) {
  emit('update:modelValue', tabs)
}

function isActive(tab: string) {
  return tab === props.modelValue?.[0]
}

const collapsed = reactive<{ [tabName: string]: boolean }>({})
if (!props.expandedByDefault) {
  for (const tabName in props.tabs) {
    collapsed[tabName] = true
  }
}
</script>

<style scoped lang="scss">
@use '../styles';

.title {
  @include styles.clean-button;
  @include styles.block-button;
  position: relative;
  padding-left: 22px;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: -50px 0 0 0 styles.$focused;
  }

  &.active {
    background-color: styles.$light-active;
    box-shadow: -50px 0 0 0 styles.$light-active;

    &:focus {
      background-color: styles.$light-active-focused;
      box-shadow: -50px 0 0 0 styles.$light-active-focused;
    }
  }

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    margin-left: -14px;
    margin-top: 5px;
    border-left: 1px solid #333;
    border-top: 1px solid #333;
    transform: rotate(-135deg);
  }

  &.collapsed::before {
    transform: rotate(135deg);
    margin-top: 7px;
    margin-left: -16px;
  }
}

.section {
  margin-left: 12px;
  border-left: 1px solid transparent;
}

.section:hover,
.title:hover + .section {
  border-left-color: #0002;
}

.tab {
  @include styles.clean-button;
  @include styles.block-button;
  padding-left: 22px;

  &:hover {
    box-shadow: -50px 0 0 0 styles.$focused;
  }

  &.active {
    background-color: styles.$light-active;
    box-shadow: -50px 0 0 0 styles.$light-active;

    &:focus {
      background-color: styles.$light-active-focused;
      box-shadow: -50px 0 0 0 styles.$light-active-focused;
    }
  }
}
</style>
