# PROXY-CMD

Toggle proxy environments (HTTP_PROXY and HTTPS_PROXY) in command line.

## Install

```bash
npm i -g proxy-cmd
```

## How to use

### Windows

Press `Win + R`, enter `cmd`, then press `Ctrl + Shift + Enter`, open cmd as administrator

```bash
# Init proxy
proxy-init 'http://127.0.0.1:7890'

# Show proxy target url
proxy-url

# Change proxy target url
proxy-url 'http://127.0.0.1:8234'

# Set proxy env global, needs administrator privileges
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-set

# Unset proxy env global, needs administrator privileges
proxy-del

# Set proxy env in current terminal
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-on

# Unset proxy env in current terminal
proxy-off
```

### MacOS

Open terminal

```bash
# Init proxy
sudo proxy-init 'http://127.0.0.1:7890'

# Enable proxy-cmd alias
sudo source ~/.zshrc

# Show proxy target url
sudo proxy-url

# Change proxy target url
sudo proxy-url 'http://127.0.0.1:8234'

# Set proxy env global, needs administrator privileges
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
sudo proxy-set

# Unset proxy env global, needs administrator privileges
sudo proxy-del

# Set proxy env in current terminal, should source .zshrc first
# HTTP_PROXY=http://127.0.0.1:8234
# HTTPS_PROXY=http://127.0.0.1:8234
proxy-on

# Unset proxy env in current terminal, should source .zshrc first
proxy-off
```
