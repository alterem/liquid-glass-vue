import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // 开发模式 - 演示项目
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': resolve(__dirname, 'lib')
        }
      },
      server: {
        fs: {
          allow: ['.'] // 允许访问当前目录
        }
      }
    }
  } else {
    // 构建模式 - 组件库
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
})
