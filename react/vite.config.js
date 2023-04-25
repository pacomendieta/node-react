/**
// vite.config.js por defecto 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
**/


// vite.config.js ampliado con:
// - loadEnd para cargar variables de entorno segun entorno
// - especificar puerto 
import { defineConfig } from 'vite'  
import react from '@vitejs/plugin-react' //plugin para react
import { loadEnv } from 'vite'   // helper ficheros .env.xxxx 

export default defineConfig( ({command,mode})=>{
// carga fichero env.development / env.production + VARIABLES ENTORNO SISTEMA
  const env = loadEnv(mode, process.cwd(), '') 
  return (  {
    plugins: [react()],
    server: {
      port: env.PUERTO
    }
  })
}) //defineConfig
