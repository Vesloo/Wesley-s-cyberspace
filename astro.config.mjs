import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';  // <-- ajoute cette ligne

export default defineConfig({
  site: 'https://wesley-cyberspace.vercel.app',        // ou ton domaine final
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    sitemap(),                          // maintenant OK
  ],
  output: 'static',
  adapter: vercel(),
});