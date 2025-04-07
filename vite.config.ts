import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; 
import tailwindcss from '@tailwindcss/vite';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  build: {
    outDir: 'dist', // Carpeta de salida para el build
    emptyOutDir: true, // Limpia la carpeta de salida antes de construir
  },
});