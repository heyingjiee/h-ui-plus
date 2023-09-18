#!/usr/bin/env bash

npm config get registry # 检查仓库镜像库
npm config set registry=https://registry.npmjs.org/:_authToken "$NPN_AUTH_TOKEN" #设置为官方源
#echo '请进行登录相关操作：'
#npm login # 登陆
echo "-------publishing-------"
npm publish # 发布
# npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
if [ $? -eq 0 ]; then
    echo "发布成功"
else
    echo "发布失败"
fi

exit