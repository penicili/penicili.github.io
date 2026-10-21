// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter:
    process.env.VERCEL === '1' || process.env.VERCEL === 'true'
      ? vercel()
      : node({ mode: 'standalone' }),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
site: 'https://hibagas.my.id'
base: '/'