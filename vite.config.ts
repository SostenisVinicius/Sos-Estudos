import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repo = 'Sos-Estudos';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
});
