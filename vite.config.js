import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // tailwindcss(): className に書いた Tailwind のクラスを、ビルド時に CSS へ変換する
  plugins: [react(), tailwindcss()],
})
