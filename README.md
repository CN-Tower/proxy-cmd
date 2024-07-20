# PROXY-CMD

Toggle proxy environments (HTTP_PROXY and HTTPS_PROXY) in command line.

[![npm](https://img.shields.io/npm/v/proxy-cmd.svg)](https://www.npmjs.com/package/proxy-cmd)

## Install

```bash
npm i -g proxy-cmd
```

## How to use

### Windows

Press `Win + R`, enter `cmd`, then press `Ctrl + Shift + Enter`, open cmd as administrator

```bash
# Init proxy
proxy-cmd init 'http://127.0.0.1:7890'

# Show proxy target url
proxy-cmd url

# Change proxy target url
proxy-cmd url 'http://127.0.0.1:8234'

# Set global proxy environments, needs administrator privileges
# Needs restart the terminal after running this command
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-cmd set

# Del global proxy environments, needs administrator privileges
# Needs restart the terminal after running this command
proxy-cmd del

# Set proxy environments in current terminal
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-on

# Del proxy environments in current terminal
proxy-off
```

### MacOS

Run the following commands in terminal

```bash
# Init proxy
sudo proxy-cmd init 'http://127.0.0.1:7890'

# Enable proxy-cmd alias
sudo source ~/.zshrc

# Show proxy target url
sudo proxy-cmd url

# Change proxy target url
sudo proxy-cmd url 'http://127.0.0.1:8234'

# Set global proxy environments, needs administrator privileges
# Needs restart the terminal after running this command
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
sudo proxy-cmd set

# Del global proxy environments, needs administrator privileges
# Needs restart the terminal after running this command
sudo proxy-cmd del

# Set proxy environments in current terminal, should source .zshrc first
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-on

# Del proxy environments in current terminal, should source .zshrc first
proxy-off
```
