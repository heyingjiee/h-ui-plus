/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";

import vue from "@vitejs/plugin-vue";

import vueJsx from "@vitejs/plugin-vue-jsx";

import Unocss from "./config/unocss";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //vite原生没有test字段，使用三斜线指令引入reference types="vitest"
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: "happy-dom",
    // 支持测试tsx组件
    testTransformMode: {
      web: ["/.[jt]sx$/"],
    },
  },
  build: {
    rollupOptions: {
      external: ["vue"], //配置的库 ，不会被打包到最终产物中
      output: {
        globals: {
          vue: "Vue", //这里配置 库名到全局变量的映射。代码中使用了全局变量Vue，就会被替换为使用vue包（需保证项目安装了vue包）
        },
      },
    },
    minify: "terser", //boolean | 'terser' | 'esbuild'；默认使用esbuild混淆压缩，也可以安装terser
    sourcemap: true, // 输出单独 source文件
    cssCodeSplit: true,
    lib: {
      entry: "./src/entry.ts", //入口文件。因为库不能使用 HTML 作为入口
      name: "HUI", //暴露的全局变量
      fileName: "h-ui", //打包输出的文件名前缀（h-ui.js、h-ui.umd.cjs）。（默认是 package.json 的 name 选项）
      formats: ["es", "umd", "iife"], // 导出模块格式（iife是立即执行函数的意思）
    },
  },
  plugins: [vue(), vueJsx(), Unocss()],
});
