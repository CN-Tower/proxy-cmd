# PROXY-CMD

Toggle proxy env variables (`http_proxy`, `https_proxy` and `no_proxy`) in command line.

[![npm](https://img.shields.io/npm/v/proxy-cmd.svg)](https://www.npmjs.com/package/proxy-cmd)

## Language

English | [简体中文](./README_zh-CN.md)

## Install it

```bash
npm i -g proxy-cmd
```

## How to use

### Windows

Press `Win + R`, input "cmd", then press `Ctrl + Shift + Enter`, open cmd as administrator

```bash
# Init proxy-cmd
proxy init 'http://127.0.0.1:8234'

# Set proxy env variables in current terminal, should init first
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-on

# Del proxy env variables in current terminal, should init first
proxy-off

# Set global proxy env variables, needs administrator privileges
# Needs restart the terminal after running this command!!!
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy set

# Del global proxy env variables, needs administrator privileges
# Needs restart the terminal after running this command!!!
proxy del

# Show proxy url
proxy url

# Set proxy url
proxy url 'http://127.0.0.1:7890'

# Change proxy url port
proxy port 8899

# Show NO_PROXY config
proxy np

# Change NO_PROXY config
proxy np 'localhost,127.0.0.1'

# Delete NO_PROXY config
proxy np del
```

### MacOS or Linux

Run the following commands in terminal

```bash
# Init proxy-cmd
sudo proxy init 'http://127.0.0.1:8234'

# Set proxy env variables in current terminal, should init first
# http_proxy=http://127.0.0.1:8234
# https_proxy=http://127.0.0.1:8234
proxy-on

# Del proxy env variables in current terminal, should init first
proxy-off

# Set global proxy env variables
# Needs restart the terminal after running this command!!!
# http_proxy=http://127.0.0.1:8234
# https_proxy=http://127.0.0.1:8234
sudo proxy set

# Del global proxy env variables
# Needs restart the terminal after running this command!!!
sudo proxy del

# Show proxy url
sudo proxy url

# Set proxy url
sudo proxy url 'http://127.0.0.1:7890'

# Change proxy url port
sudo proxy port 8899

# Show no_proxy config
sudo proxy np

# Change no_proxy config
sudo proxy np 'localhost,127.0.0.1'

# Delete no_proxy config
sudo proxy np del
```
