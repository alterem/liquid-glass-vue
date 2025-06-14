import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': resolve(__dirname, 'lib')
        }
      },
      server: {
        host: true,
        port: 5170,
        fs: {
          allow: ['.']
        }
      }
    }
  } else {
    if (mode === 'gh-pages') {
      return {
        base: '/liquid-glass-vue/',
        plugins: [vue()],
        resolve: {
          alias: {
            '@': resolve(__dirname, 'lib')
          }
        },
        build: {
          outDir: 'dist-demo',
          rollupOptions: {
            input: {
              main: resolve(__dirname, 'index.html')
            }
          }
        }
      }
    } else {
      return {
        plugins: [
          vue(),
          dts({
            insertTypesEntry: true,
            copyDtsFiles: true,
            include: ['lib/**/*']
          })
        ],
        resolve: {
          alias: {
            '@': resolve(__dirname, 'lib')
          }
        },
        build: {
          lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'VueLiquidGlass',
            fileName: (format) => `vue-liquid-glass.${format}.js`,
            formats: ['es', 'umd']
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              globals: {
                vue: 'Vue'
              },
              exports: 'named'
            }
          }
        }
      }
    }
  }
})
