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
  #已定义（Github Action传入了）
   npm config set //registry.npmjs.org/:_authToken "$NPN_AUTH_TOKEN"
fi

echo "-------publishing-------"
npm publish # 发布
# npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
if [ $? -eq 0 ]; then
    echo "发布成功"
else
    echo "发布失败"
fi

exit