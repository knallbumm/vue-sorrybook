export default {
  './**/*.{js,jsx,ts,tsx,css,scss,vue}': 'npm run lint:files',
  './**/*.{ts,tsx,vue}?(x)': () => 'npm run typecheck',
}
