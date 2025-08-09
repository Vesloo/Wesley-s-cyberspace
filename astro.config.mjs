import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wesley-cyberspace.vercel.app' || 'http://localhost:4321', 
  integrations: [
    tailwind(),
    sitemap(),
  ],
  output: 'static',
  adapter: vercel(),
});