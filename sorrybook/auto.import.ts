export function autoImportSorries() {
  const glob = import.meta.glob('../../../src/**/*.story.vue')
  const imports = {}

  for (const path in glob) {
    const splitPath = path.split('/')
    const fileName = splitPath[splitPath.length - 1]
    const tabName = fileName.split('.story.vue')[0]
    imports[tabName] = glob[path]
  }

  return imports
}
