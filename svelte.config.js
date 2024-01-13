import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default /** @type {Promise<Processed>} */ {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
