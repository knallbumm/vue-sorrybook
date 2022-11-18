<template>
  <table class="event-table">
    <tbody>
      <tr v-for="(event, i) in events" :key="i">
        <template v-for="(value, j) in event" :key="j">
          <td v-if="typeof value === 'object'" class="object">
            {{ value?.constructor?.name }}
            {{ JSON.stringify(value, null, 1) }}
          </td>
          <td v-else :class="{ string: typeof value === 'string' }">
            {{ value }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>

  <button class="clear-events" @click="$emit('clear')">Clear events</button>
</template>

<script setup lang="ts">
defineProps<{
  events?: unknown[][]
}>()
defineEmits(['clear'])
</script>

<style scoped lang="scss">
@use '../../styles';

.event-table {
  border-collapse: collapse;
  display: table;
  width: 100%;

  tr {
    border-bottom: 1px solid #ddd;
  }

  td {
    padding: 3px 10px;
    font-family: Consolas, monospace;

    &.string {
      color: #770022;
    }

    &:first-child {
      color: #8a5a00;
    }
  }
}

.clear-events {
  @include styles.button;
  float: right;
  margin: 0.5rem;
}
</style>
