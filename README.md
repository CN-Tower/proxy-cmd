# PROXY-CMD

Toggle proxy environments (HTTP_PROXY and HTTPS_PROXY) in command line.

[![npm](https://img.shields.io/npm/v/proxy-cmd.svg)](https://www.npmjs.com/package/proxy-cmd)

## Install

```bash
npm i -g proxy-cmd
```

## How to use

### Windows

Press `Win + R`, input "cmd", then press `Ctrl + Shift + Enter`, open cmd as administrator

```bash
# Init proxy
proxy-cmd init 'http://127.0.0.1:7890'

# Set current process proxy env variables
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-on

# Del current process proxy env variables
proxy-off

# Set global proxy env variables, needs administrator privileges
# Needs restart the terminal after running this command
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-cmd set

# Del global proxy env variables, needs administrator privileges
# Needs restart the terminal after running this command
proxy-cmd del

# Show proxy target url
proxy-cmd url

# Change proxy target url
proxy-cmd url 'http://127.0.0.1:8234'

# Show NO_PROXY config
proxy-cmd np

# Change NO_PROXY config
proxy-cmd np 'localhost,127.0.0.1'

# Delete NO_PROXY config
proxy-cmd np del
```

### MacOS or Linux

Run the following commands in terminal

```bash
# Init proxy
sudo proxy-cmd init 'http://127.0.0.1:7890'

# Set current process proxy env variables, should source .zshrc and .bashrc first
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-on

# Del current process proxy env variables, should source .zshrc and .bashrc first
proxy-off

# Set global proxy env variables, needs administrator privileges
# Needs restart the terminal after running this command
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
sudo proxy-cmd set

# Del global proxy env variables, needs administrator privileges
# Needs restart the terminal after running this command
sudo proxy-cmd del

# Enable proxy-cmd alias
sudo source ~/.bashrc
# MacOs only
sudo source ~/.zshrc

# Show proxy target url
sudo proxy-cmd url

# Change proxy target url
sudo proxy-cmd url 'http://127.0.0.1:8234'

# Show NO_PROXY config
sudo proxy-cmd np

# Change NO_PROXY config
sudo proxy-cmd np 'localhost,127.0.0.1'

# Delete NO_PROXY config
sudo proxy-cmd np del
```
