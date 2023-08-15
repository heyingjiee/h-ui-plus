/**
 * 校验是否使用pnpm
 */
if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.log("本项目强制使用pnpm作为包管理工具");
  console.warn(
    `\u001b[33mThis repository requires using pnpm as the package manager ` +
      `for scripts to work properly.\u001b[39m\n`,
  );
  process.exit(1);
}
