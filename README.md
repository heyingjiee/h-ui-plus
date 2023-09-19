# 组件库项目
[![Unit Test](https://github.com/heyingjiee/h-ui-plus/actions/workflows/test.yaml/badge.svg)](https://github.com/heyingjiee/h-ui-plus/actions/workflows/test.yaml)[![Publish Docs](https://github.com/heyingjiee/h-ui-plus/actions/workflows/publish-docs.yaml/badge.svg)](https://github.com/heyingjiee/h-ui-plus/actions/workflows/publish-docs.yaml)[![Publish To Npm](https://github.com/heyingjiee/h-ui-plus/actions/workflows/publish-npm.yaml/badge.svg)](https://github.com/heyingjiee/h-ui-plus/actions/workflows/publish-npm.yaml)



## 目录规范

```plain
.
├── .github
|     └── workflows     #Github Action的文件
├── node_modules  
├── config              # 配置文件
├── scripts             # 脚本  （shell+js），一般是package.json中脚本、Action中调用
├── coverage            # 覆盖率报告
├── demo                # 代码范例 （可以叫example）
├── docs                # 文档
├── cli                	# CLI工具
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
{
	"lint-staged": {
  	//对暂存区的如下文件执行脚本
    "*.{js,ts,tsx,vue,json}": [
      "pnpm lint"
    ]
  }
}
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
//commitlint.config.js
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

## CI/CD流程

CI/CD流程，我们使用Github Action ，其可以认为是Github 提前写好的一些常用的脚本，当然这些脚本也支持自己定义。可以在下面网址查找：[Action 应用市场](https://github.com/marketplace?type=actions&query=actions)

[Action文档](https://docs.github.com/zh/actions/using-workflows/workflow-syntax-for-github-actions#name)

### 推送分支触发单元测试

**使用Action添加CI流程**

新建`.github/workflows/test.yml`

```yml
# 一个yaml/yml文件就是一个工作流

# 指定工作流名
name: Unit Test 
# 触发工作流执行的场景（指定哪个分支，遇到push、pull_request时触发）
on: 
  push: 
    branches: [ main ]
  pull_request:
    branches: [ main ]
# 一个工作流，可以包含多个jobs（任务）
jobs: 
  #这里是一个任务，用于单元测试
  UnitTest:
    # runs-on 指定运行的容器环境 windows-(xxx version)、ubuntu-(xxx version)、Macos-(xxx version)
    runs-on: ubuntu-latest
    # 指定任务涉及的步骤
    steps: 
      # uses 使用第三方的action ，参考：（https://github.com/marketplace?type=actions&query=actions）
      # with 给action传入参数。至于yaml对应的格式应该是---> steps:[{uses:'pnpm/action-setup@v2.1.0',with:{version:'7.2.1'}}]
      - uses: actions/checkout@v3 # 检出仓库，触发的分支是哪个，就检出哪个分支代码
      - uses: pnpm/action-setup@v2 # 使用pnpm安装依赖，传入参数version指定pnpm版本
        with: 
          version: 8 
      # name 步骤名 ， run 需要执行的脚本
      - name : Install Dependencies
        run: pnpm i 
      - name: Run Test
        run: pnpm test:run
```

提交到GitHub的main分支，会自动触发Action

仓库的Action页签下可以查看到

![image-20230918173446554](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230918173446%20.png)



**生成Action徽章**

在GitHub上进入Actions页签，选择一个工作流进入

![image-20230918173550113](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230918173550%20.png)

![image-20230918173626399](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230918173626%20.png)



### 合并分支触发npm自动发布

发布npm包的触发条件，肯定不是每次 push

一般是：新建一个publish分支，设置合并到该分支触发一个Action。这个Action来进行自动发布npm包

```shell
git checkout -b publish
git push -u origin publish
```

根目录新建publish.sh脚本

此脚本判断了是否存在环境NPN_AUTH_TOKEN，这个环境变量是npm的token

如果没有就调用npm login，随后提示输入npm的用户名、密码、邮箱，才能发布

如果有就直接设置到npm的配置中，就可以直接发布了（Github Action可以通过环境变量传入）

```sh
#!/usr/bin/env bash
#设置为官方源
npm config set registry=https://registry.npmjs.org

# $NPN_AUTH_TOKEN是npm的token
# 使用 -z 选项检查环境变量是否为空或未定义
if [ -z "$NPN_AUTH_TOKEN" ]; then
    #未定义
    echo '请进行登录相关操作：'
    npm login # 登陆
else
  #已定义 Github Action传入了，有这个npm的token就可以不用登录了
   npm config set //registry.npmjs.org/:_authToken "$NPN_AUTH_TOKEN"
fi #shell语法，结束if语句块

echo "-------publishing-------"
npm publish # 发布
# npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
if [ $? -eq 0 ]; then # $?用于获取最后一个执行命令的退出状态码，-eq是等于
    echo "发布成功"
else
    echo "发布失败"
fi 

exit
```

**本地执行脚本**

```shell
chmod +x publish.sh #默认创建的文件没有执行权限，需要增加执行权限
./publish.sh
```

**Action执行脚本**

获取npm token，用于Action自动发布到npm上

![image-20230902201443287](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230902201443%20.png)



我们发布到npm需要使用npm的token，但是Action 代码是公开的，我们需要提前把token设置到Action的环境变量中。在Action脚本中就可以直接引用了，更加安全

![image-20230902200947687](/Users/yc/Library/Application Support/typora-user-images/image-20230902200947687.png)

编写Action脚本

```yaml
# .github/workflows/publish-npm.sh
name: Publish To Npm

on:
  pull_request:
    branches: [publish]

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - name: Install Dependencies
        run: pnpm i
      - name: Build
        run: pnpm build
      - name: "Publish to the npm"
      	#注入的环境变量，在./publish.sh中会接收到
        env:
          NPN_AUTH_TOKEN: ${{secrets.NPN_AUTH_TOKEN}} # github Action中通过secrets.xxx引用环境变量
        #|是管道符，表示后续的文本块作为纯文本字符串处理，并保留其中的换行符和格式。run: |就可以理解为执行后面的脚本
        run: |  
          chmod +x ./publish.sh 
          ./publish.sh
```

pr触发如何操作？

![image-20230918175445289](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230918175445%20.png)

![image-20230919101611816](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230919101612%20.png)

### 合并分支触发文档部署





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

## 集成文档
配置Vitepress，参考 https://github.com/vuejs/vitepress/tree/main/docs
```shell
## 安装vitepress。 新建docs/index.md 。npx vitepress dev docs (package.json中配置脚本也行)
pnpm i vitepress@1.0.0-beta.7 -D
## vitepress的一个主题，可以实现展示Vue组件+组件代码。https://www.npmjs.com/package/vitepress-theme-demoblock
pnpm i vitepress-theme-demoblock@3.0.3 -D
```

## 项目版本

项目的版本，在package.json的version字段

![image-20230918112701375](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230918112701%20.png)

版本格式：**主版本号.次版本号.修订号 -[版本状态]**

* 主版本号：不兼容的 API 修改
* 次版本号：向下兼容的功能性新增
* 修订号：向下兼容的问题修正 
* 版本状态
  * 预览版：alpha、alpha-2
  * 公开测试版：beta
  * 上线候选版（Release Condidate）：即已经具备正式上线条件的版本，RC
  * 正式发布的版本（General Availability ），GA

例如：

```
0.0.1-alpha
```





## README

标准README格式：https://github.com/RichardLitt/standard-readme

### 徽章

* GitHub Action 徽章

  徽章名是在yaml文件中定义的Action工作流名，徽章状态会自动跟随Action结果变化

  [![Unit Test](https://github.com/heyingjiee/h-ui-plus/actions/workflows/test.yaml/badge.svg)](https://github.com/heyingjiee/h-ui-plus/actions/workflows/test.yaml)

* 自己生成的徽章

  https://shields.io/



## CLI

[艺术字生成](https://tooltt.com/art-ascii/)

![image-20230919110723538](https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20230919110723%20.png)

