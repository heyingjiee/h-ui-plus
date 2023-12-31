// import fs from "fs-extra";
// import path from "path";
// import config from "../vite.config";
// import { build, InlineConfig, defineConfig, UserConfig } from "vite";
// const buildAll = async () => {
//   // 全量打包
//   // await build(config as InlineConfig);

//   // 读取 Package.json 文件
//   // const packageJson = await import("../package.json");
//   const packageJson = await fs.readFile("../package.json", {
//     encoding: "utf-8",
//   });
//   packageJson["main"] = "h-ui.umd.js";
//   packageJson["module"] = "h-ui.js";
//   fs.outputFile(
//     path.resolve(config.build.outDir, `package.json`),
//     JSON.stringify(packageJson, null, 2),
//   );

//   // 拷贝 README.md文件
//   fs.copyFileSync(
//     path.resolve("./README.md"),
//     path.resolve(config.build.outDir + "/README.md"),
//   );

//   const srcDir = path.resolve(__dirname, "../src/");
//   fs.readdirSync(srcDir)
//     .filter((name) => {
//       // 只要目录不要文件，且里面包含index.ts
//       const componentDir = path.resolve(srcDir, name);
//       const isDir = fs.lstatSync(componentDir).isDirectory();
//       return isDir && fs.readdirSync(componentDir).includes("index.ts");
//     })
//     .forEach(async (name) => {
//       const outDir = path.resolve(config.build.outDir, name);
//       const custom = {
//         lib: {
//           entry: path.resolve(srcDir, "./src", name),
//           name, // 导出模块名
//           fileName: `index`,
//           formats: [`es`, `umd`],
//         },
//         outDir,
//       };

//       Object.assign(config.build, custom);
//       await build(defineConfig(config as UserConfig) as InlineConfig);

//       fs.outputFile(
//         path.resolve(outDir, `package.json`),
//         `{
//             "name": "smarty-ui-vite/${name}",
//             "main": "index.umd.js",
//             "module": "index.umd.js"
//   }`,
//         `utf-8`,
//       );
//     });
// };

// buildAll();
