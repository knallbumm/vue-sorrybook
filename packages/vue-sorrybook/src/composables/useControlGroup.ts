/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Component, computed, reactive, Ref, ref, shallowRef } from 'vue'

import { Replacer, Reviver } from './useReplaceComponents'

export interface ControlWithDefault {
  default: any
  type?: 'textarea'
  options?: any[]
  components?: Record<string, Component>
  step?: number
  replacer?: Replacer
  reviver?: Reviver
}

export interface ControlGroupWithDefaults {
  [name: string]: ControlWithDefault
}

export type BindsFromDefaults<T extends ControlGroupWithDefaults> = {
  [name in keyof T]: T[name]['default']
}

export interface IControl {
  value: Ref<any>
  type?: 'textarea'
  options?: any[]
  step?: number
  replacer?: Replacer
  reviver?: Reviver
}

export interface IControlGroup {
  [name: string]: IControl
}

/**
 * Helper composable to define sorrybook-controls + reactive bindings
 */
export const useControlGroup = <T extends ControlGroupWithDefaults>(
  obj: T,
  extraControls?: IControlGroup
): readonly [IControlGroup, BindsFromDefaults<T>] => {
  const controls: IControlGroup = {}
  if (extraControls) {
    for (const controlName in extraControls) {
      controls[controlName] = extraControls[controlName]
    }
  }

  const binds = new Map()
  for (const [name, { components, ...group }] of Object.entries(obj)) {
    if (components != null) {
      const [control, componentRef] = makeComponentSelect(group, components)
      binds.set(name, componentRef)
      controls[name] = control
    } else {
      const refValue: Ref<any> = ref(group.default)
      binds.set(name, refValue)
      controls[name] = { ...group, value: refValue }
    }
  }

  return [controls, reactive(Object.fromEntries(binds))] as const
}

function makeComponentSelect(
  group: ControlWithDefault,
  components: Record<string, Component>
): [IControl, any] {
  const renderToNameMap = new Map<any, string>()
  for (const name in components) {
    renderToNameMap.set((components[name] as any).render, name)
  }

  const componentRef = shallowRef(group.default)

  const currentKey = computed({
    get() {
      return renderToNameMap.get(componentRef.value.render)
    },
    set(newKey) {
      if (newKey != null) {
        componentRef.value = components[newKey]
      } else {
        componentRef.value = null
      }
    },
  })

  return [
    {
      ...group,
      value: currentKey,
      options: Object.keys(components),
    },
    componentRef,
  ]
}
