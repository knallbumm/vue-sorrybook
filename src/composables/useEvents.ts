/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'

export function useEvents(eventTypes: string[]) {
  const events = ref<any[][]>([])

  const eventListeners: Record<string, (_: any) => void> = {}

  for (const eventType of eventTypes) {
    eventListeners[eventType] = (...args: any[]) => {
      events.value.push([eventType, ...args])
    }
  }

  return [events, eventListeners] as const
}
