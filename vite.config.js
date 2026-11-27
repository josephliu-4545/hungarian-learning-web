import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { piperPreview } from './scripts/piper-preview.mjs';
export default defineConfig({
    plugins: [react(), piperPreview()],
    test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', css: true },
});
