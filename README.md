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
# Set proxy target url
proxy-url 'https://127.0.0.1:7890'

# Set proxy env
proxy-set

# Del proxy env
proxy-end
```

### MacOS
Open terminal

```bash
# Set proxy target url
sudo proxy-url 'https://127.0.0.1:7890'

# Set proxy env
sudo proxy-set

# Del proxy env
sudo proxy-end
```