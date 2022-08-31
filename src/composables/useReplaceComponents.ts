/* eslint-disable @typescript-eslint/no-explicit-any, no-unused-vars */
import { Component, shallowRef } from 'vue'

export type Replacer = (this: any, key: string, value: any) => any
export type Reviver = (this: any, key: string, value: any) => any

/**
 * Generates a replacer and reviver for converting between components and JSON.
 */
export function useReplaceComponents(
  keyAllowlist: string[] | null,
  mapping: Record<string, Component>
): [Replacer, Reviver] {
  const replacer: Replacer = (key, value) => {
    if (keyAllowlist == null || keyAllowlist.includes(key)) {
      for (const stringRepr in mapping) {
        if (value.render === (mapping[stringRepr] as any).render) {
          return stringRepr
        }
      }
    }
    return value
  }
  const reviver: Reviver = (key, value) => {
    if (keyAllowlist == null || keyAllowlist.includes(key)) {
      for (const stringRepr in mapping) {
        if (value === stringRepr) {
          return shallowRef(mapping[stringRepr])
        }
      }
    }
    return value
  }
  return [replacer, reviver]
}
