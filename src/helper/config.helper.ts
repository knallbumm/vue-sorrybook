interface SorrybookConfig {
  css: string
}

export function defineSorrybookConfig(options: SorrybookConfig) {
  return options
}
// yeet: fileURLToPath(new URL('src/**/*.story.vue', import.meta.url))
