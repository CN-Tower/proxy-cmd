#!/usr/bin/env node

const os = require('os')
const { execSync } = require('child_process')
const { writeFileSync, existsSync, readFileSync, ensureFileSync } = require('fs-extra')
const { join } = require('path')
const chalk = require('chalk')

const [x, y, z] = process.argv
const isGlobal = y === '-g' || z === '-g'
const proxyConf = join(__dirname, '.proxy')
const proxyUrl = readFileSync(proxyConf, 'utf-8')

if (proxyUrl) {
  // Windows
  if (os.platform() === 'win32') {
    if (isGlobal) {
      execSync(`setx HTTP_PROXY "${proxyUrl}" /M`)
      execSync(`setx HTTPS_PROXY "${proxyUrl}" /M`)
    } else {
      execSync(`setx HTTP_PROXY "${proxyUrl}"`)
      execSync(`setx HTTPS_PROXY "${proxyUrl}"`)
    }
  }
  // MacOS
  else if (os.platform() === 'darwin') {
    if (isGlobal) {
      const rcFile = join(process.HOME, '.zshrc')
      ensureFileSync(rcFile)
      const rc = readFileSync(rcFile, 'utf-8')
      if (rc.match(/HTTP_PROXY|HTTPS_PROXY/)) {
        writeFileSync(rcFile, rc.replace(/^\s*#\s*(HTTPS?_PROXY)\s*=\s*.*/mg, `$1="${proxyUrl}"`))
      } else {
        writeFileSync(rcFile, `${rc}\nHTTP_PROXY="${proxyUrl}"\nHTTP_PROXY="${proxyUrl}"`)
      }
      execSync(`source ${rcFile}`)
    } else {
      execSync(`export HTTP_PROXY="${proxyUrl}"`)
      execSync(`export HTTPS_PROXY="${proxyUrl}"`)
    }
  }
  console.log(chalk.green(`Success set proxy env to: ${proxyUrl}`))
} else {
  console.log(chalk.red('Plese set proxy url first, run: `proxy-url http://proxy-ip:port`'))
}