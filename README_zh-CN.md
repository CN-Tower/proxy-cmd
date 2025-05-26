# PROXY-CMD

在命令行中设置或移除代理环境变量：`http_proxy`、`https_proxy`和`no_proxy`.

[![npm](https://img.shields.io/npm/v/proxy-cmd.svg)](https://www.npmjs.com/package/proxy-cmd)

## 选择语言

[English](./README.md) | 简体中文

## 安装依赖

```bash
npm i -g proxy-cmd
```

## 如何使用

### Windows系统

键盘按 `Win + R`, 输入 "cmd", 然后按 `Ctrl + Shift + Enter`组合键，以管理员权限打开CMD

```bash
# 初始化 proxy-cmd
proxy init 'http://127.0.0.1:8234'

# 在当前命令行中设置代理环境变量，需要先初始化
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-on

# 移除当前命令行中的代理环境变量，需要先初始化
proxy-off

# 设置全局代理环境变量，需要以管理员权限打开命令行（执行完此命令后，需重启或打开新命令行生效！）
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy set

# 移除全局代理环境变量，需要以管理员权限打开命令行（执行完此命令后，需重启或打开新命令行生效！）
proxy del

# 显示代理URL
proxy url

# 修改代理URL
proxy url 'http://127.0.0.1:7890'

# 修改代理URL端口
proxy port 8899

# 显示 NO_PROXY 设置
proxy np

# 修改 NO_PROXY 设置
proxy np 'localhost,127.0.0.1'

# 移除 NO_PROXY 设置
proxy np del
```

### MacOS或Linux系统

在命令行（终端）中执行下面的命令：

```bash
# 初始化 proxy-cmd
sudo proxy init 'http://127.0.0.1:8234'

# 在当前命令行中设置代理环境变量，需要先初始化
# http_proxy=http://127.0.0.1:8234
# https_proxy=http://127.0.0.1:8234
proxy-on

# 移除当前命令行中的代理环境变量，需要先初始化
proxy-off

# 设置全局代理环境变量（执行完此命令后，需重启或打开新命令行生效！）
# http_proxy=http://127.0.0.1:8234
# https_proxy=http://127.0.0.1:8234
sudo proxy set

# 移除全局代理环境变量（执行完此命令后，需重启或打开新命令行生效！）
sudo proxy del

# 显示代理URL
sudo proxy url

# 修改代理URL
sudo proxy url 'http://127.0.0.1:7890'

# 修改代理URL端口
proxy port 8899

# 显示 no_proxy 设置
sudo proxy np

# 修改 no_proxy 设置
sudo proxy np 'localhost,127.0.0.1'

# 移除 no_proxy 设置
sudo proxy np del
```
