#!/usr/bin/env node

import { execSync } from 'child_process'
import { writeFileSync, readFileSync, ensureFileSync } from 'fs-extra'
import { join } from 'path'
import os from 'os'
import chalk from 'chalk'

const proxyCmd = join(os.homedir(), 'proxy-cmd')
const proxyUrl = join(proxyCmd, '.proxy-url')
ensureFileSync(proxyUrl)
const purl = readFileSync(proxyUrl, 'utf-8')

if (purl) {
  // Windows
  if (os.platform() === 'win32') {
    try {
      execSync(`setx HTTP_PROXY "${purl}" /M`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`setx HTTPS_PROXY "${purl}" /M`, { stdio: 'inherit' })
    } catch {}
  }
  // MacOS
  else if (os.platform() === 'darwin') {
    const rcFile = join(os.homedir(), '.zshrc')
    ensureFileSync(rcFile)
    let rcTpl = readFileSync(rcFile, 'utf-8')
    if (rcTpl.match(/HTTP_PROXY/)) {
      rcTpl = rcTpl.replace(/^\s*#?\s*export HTTP_PROXY\s*=\s*.*/mg, `export HTTP_PROXY="${purl}"`)
    } else {
      rcTpl = `${rcTpl}\nexport HTTP_PROXY="${purl}"`
    }
    if (rcTpl.match(/HTTPS_PROXY/)) {
      rcTpl = rcTpl.replace(/^\s*#?\s*export HTTPS_PROXY\s*=\s*.*/mg, `export HTTPS_PROXY="${purl}"`)
    } else {
      rcTpl = `${rcTpl}\nexport HTTPS_PROXY="${purl}"`
    }
    writeFileSync(rcFile, rcTpl)
    execSync(`source ${rcFile}`, { stdio: 'inherit' })
  }
  console.log(chalk.green(`Success set proxy env to: ${purl}`))
} else {
  console.log(chalk.red('Plese set proxy url first, run: `proxy-url http://proxy-ip:port`'))
}
