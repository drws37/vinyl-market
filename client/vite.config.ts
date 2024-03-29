import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/recordImg': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
      },
      '/profileImg': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
      },
    },
  },
});
