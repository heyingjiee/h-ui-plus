# 组件库项目

## 目录规范

```plain
.
├── config              # 配置文件
├── coverage            # 覆盖率报告
├── demo                # 代码范例
├── docs                # 文档
├── node_modules  
├── scripts             # 脚本 发布、提交信息检查
├── src                 # 组件代码                # 组件代码
|   └── button          # 组件包名（小写 + 中划线）
|        ├── index.ts    # 组件入口
|        ├── Button.tsx  # 组件代码（大驼峰）  
|        └── __tests__   # 测试用例 (大驼峰.spec.ts)
|                 └── Button.spec.ts 
|  
└── types                # TS类型定义

```

## 集成规范化工具

主要使用了

* lint-staged ：对暂存区代码，执行指定脚本
* husky：为Git提交的各个节点提供钩子，指定指定脚本

```shell
pnpm i lint-staged -D
pnpm i husky -D
```



### eslint、prettier

**1、配置**

eslint完成对于代码语法的检查，prettier以eslint插件的形式接入
```shell
### eslint
pnpm i eslint -D

## eslint支持TS检查
pnpm i @typescript-eslint/parser -D ## TS的解析器，(默认解析器仅支持将JS解析为语法树)
pnpm i @typescript-eslint/eslint-plugin -D ## 定义了大量TS校验规则的插件

## eslint支持Vue检查
pnpm i eslint-plugin-vue -D #这个插件集成了vue-eslint-parser（解析.vue文件）

## 安装了eslint-plugin-vue会把html文件错误的当成vue文件的template解析导致eslint提示html报错。可以使用这个插件来识别html文件，其作用是检查html文件中的js
pnpm i eslint-plugin-html -D

## eslint支持JSON检查
pnpm i eslint-plugin-json -D

## 格式化eslint输出错误和警告信息的插件
pnpm i eslint-formatter-pretty -D 

## eslint中的prettier插件
pnpm i prettier -D ## prettier包
pnpm i eslint-plugin-prettier -D ## eslint的prettier插件，用于将 prettier 的格式化规则集成到eslint中
pnpm i @vue/eslint-config-prettier -D ##  Vue官方提供的prettier配置规则集合


## 用于解析JS代码的eslint解析器，它会使用Babel转换后代码作为eslint的输入。（Vue CLI 3 创建的项目中，如果你的代码使用了新的 ECMAScript 特性或者 JSX，安装并配置 babel-eslint 是一个常见的做法。）
pnpm i @babel/eslint-parser -D

```
package.json增加格式化脚本
注意：
* 安装了vscode eslint插件后。需要再vsocode的setting.json中配置eslint插件可以检查js、ts、vue、json等格式的文件
  ```json
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue",
        "json"
    ],
  ```
  
* package.json这里的修复仅仅设置了三种格式

* 因为prettier是作为eslint插件集成进去的，这里eslint命令也会修复prettier相关的问题

* 因为安装了ts、vue、json的npm插件，所以eslint就支持了检查这些文件的能力

  ```json
  {
      "scripts":{
          "lint":"eslint --fix --ext .ts,.tsx,.vue  src",
      }
  }
  ```



**2、集成**

手动在package.json中添加。`pnpm i`会自动触发prepare脚本，在个目录生成一个.husky目录

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

配置好后，我们先手动生成

```shell
npx husky install   
```

生成指定在.husky文件下生成pre-commit脚本，在commit前触发脚本`npx lint-staged`

```shell
npx husky add .husky/pre-commit "npx lint-staged"
```

触发`lint-staged`命令，会执行package.json中的`"lint-staged"`自定指定的脚本，如果执行完指定脚本后文件发生了变化，则会自动添加到暂存区

这里我们触发lint校验

```json
"lint-staged": {
  	//对暂存区的如下文件执行脚本
    "*.{js,ts,tsx,vue,json}": [
      "pnpm lint"
    ]
  },
```

总结：

```
Git 钩子（提交代码前触发的钩子）----> 对暂存区执行脚本（pnom lint）----> 脚本执行成功，继续执行执行Git流程
```



### commitlint

**1、配置**

安装工具

```shell
pnpm i @commitlint/cli -D 
pnpm i @commitlint/config-conventional -D ## Angular团队的提交信息规范
```

配置commit message规则

```js
module.exports = {
    extends: ['@commitlint/config-conventional'],
}
```

config-conventional支持的提交类型

```plain
feat: 新功能

fix: bug 修复

docs: 仅修改文档

style: 修改格式（空格，格式化，省略分号等），对代码运行没有影响

refactor: 重构（既不是修 bug ，也不是加功能）

build: 构建流程、外部依赖变更，比如升级 npm 包、修改 webpack 配置等

perf: 性能优化

test: 测试相关

chore: 对构建过程或辅助工具和库（如文档生成）的更改

ci: ci 相关的更改

revert: 当前提交是为了撤销之前的某次提交，应该用 revert 开头，后面加上被撤销的提交的 header，在 body 中应该注明：This reverts commit <hash>. ，hash 指的就是将要被撤销的 commit SHA 
// 例如
revert: feat(user): add user type
This reverts commit ca16a365467e17915f0273392f4a13331b17617d.
```



**2、集成**

在husky的提交commit添加脚本，在提交commit message会触发校验

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

### changelog

如果所有 commit message都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成

生成的文档包括以下三个部分。

> - New features
> - Bug fixes
> - Breaking changes.

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接

**1、配置**

安装

```shell
pnpm install -D conventional-changelog-cli
```

生成CHANGELOG.md的命令

```shell
conventional-changelog -p angular -i CHANGELOG.md -w #命令不会覆盖以前的 Change log，只会在CHANGELOG.md的头部加上自从上次发布以来的变动

conventional-changelog -p angular -i CHANGELOG.md -w -r 0 #生成所有的 Change log，要改为运行下面的命令
```

**2、集成**

这个需要发版时，手动触发生成。（不适合用Git钩子每次触发）

```json
scripts: {
   "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md"
}
```





## 集成测试框架

**1、配置**

单元测试

```shell
## 测试框架，用于执行整个测试过程并提供断言库、mock、覆盖率；(https://cn.vitest.dev/)
pnpm i -D vitest
## 在node环境中模拟Dom对象（jsdom库也常用）
pnpm i -D happy-dom
## Vue官方的单元测试工具库。封装了vue测试的过程，例如：初始化vue实例、渲染组件（https://test-utils.vuejs.org/）
pnpm i -D @vue/test-utils
```

**2、集成**

Git推送前触发的钩子

```shell
npx husky add .husky/pre-push "pnpm test:run"
```

package.json增加脚本

```json
"scripts": {
    "test": "vitest", //一直运行。代码修改自动运行测试用例
    "test:run": "vitest run"  //只运行一次
  },
```

## 初始化组件库

Node类型支持
```shell
# 增加对node内置模块的类型支持（比如引入path这种node内置模块）
pnpm i  @types/node -D
```

搭建组件环境
```shell
## 安装vite
pnpn i vite@latest
## 安装vue
pnpm i vue@"3.2.37"
## 提供SFC能力（装了这个才能编译*.vue文件，为JS渲染函数）。在vite.config.ts中添加插件
pnpm i @vitejs/plugin-vue@"3.0.3" -D
## 提供TSX能力 （可以使用tsx编写vue项目）
pnpm i @vitejs/plugin-vue-jsx@"2.0.0" -D

```

CSS样式
```shell
## 原子样式组件
pnpm i -D unocss@"0.45.6"
pnpm i -D @iconify-json/ic@"1.1.4"
```

## 文档
配置Vitepress，参考 https://github.com/vuejs/vitepress/tree/main/docs
```shell
## 安装vitepress。 新建docs/index.md 。npx vitepress dev docs (package.json中配置脚本也行)
pnpm i vitepress@1.0.0-beta.7 -D
## vitepress的一个主题，可以实现展示Vue组件+组件代码。https://www.npmjs.com/package/vitepress-theme-demoblock
pnpm i vitepress-theme-demoblock@3.0.3 -D
```
