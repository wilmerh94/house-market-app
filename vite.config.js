import { defineConfig } from 'vite';
import svgr from '@honkhonk/vite-plugin-svgr';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [react(), svgr()],
 esbuild: {
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
 },
});
