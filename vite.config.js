import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Una hoja de estilos; las funciones de Motion se cargan aparte
    // después del primer render para mantener visible el HTML inicial.
    cssCodeSplit: false,
    // El build de SSR solo sirve para pre-renderizar: no lleva fotos.
    copyPublicDir: !isSsrBuild,
  },
  ssr: {
    // Empaquetar todo en el bundle de pre-renderizado: Node no resuelve
    // bien los imports profundos de @mui/icons-material (CommonJS) y así
    // hay una sola copia de Emotion.
    noExternal: true,
  },
}));
