import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgSprites from "rollup-plugin-svg-sprites";
import commonjs from "@rollup/plugin-commonjs";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgSprites(), commonjs()],
  
  // css: {
  //   // css预处理器
  //   preprocessorOptions: {
  //     less: {
  //       charset: false,
  //       // additionalData: '@import "./src/assets/style/global.less";',
  //     },
  //   },
  // },
});
