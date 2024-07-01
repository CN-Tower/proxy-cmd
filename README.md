# PROXY-CMD

Switch proxy environments in command line.

## Install

```bash
npm i -g proxy-cmd
```

## How to use

### Windows
Press `Win + R`, enter `cmd`, then press `Ctrl + Shift + Enter`, open cmd as administrator

```bash
# Init proxy
proxy-init 'https://127.0.0.1:7890'

# Show proxy target url
proxy-url

# Change proxy target url
proxy-url 'https://127.0.0.1:8234'

# Set proxy env global, needs administrator privileges
proxy-set

# Unset proxy env global, needs administrator privileges
proxy-del

# Set proxy env in active terminal
proxy-on

# Unset proxy env in active terminal
proxy-off
```

### MacOS
Open terminal

```bash
# Init proxy
sudo proxy-init 'https://127.0.0.1:7890'

# Enable proxy-cmd alias
sudo source ~/.zshrc

# Show proxy target url
sudo proxy-url

# Change proxy target url
sudo proxy-url 'https://127.0.0.1:8234'

# Set proxy env global, needs administrator privileges
sudo proxy-set

# Unset proxy env global, needs administrator privileges
sudo proxy-del

# Set proxy env in active terminal, should source .zshrc first
proxy-on

# Unset proxy env in active terminal, should source .zshrc first
proxy-off
```