import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    //iss kii waja sayy CORS error nahi ayein gayy 
    proxy:{
      '/api': "http://localhost:3000"
    }
  }
})
