import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('../.env') })
console.log({ path: path.resolve('../.env') })

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
})
