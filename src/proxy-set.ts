#!/usr/bin/env node

import { execSync } from 'child_process'
import { writeFileSync, readFileSync, ensureFileSync } from 'fs-extra'
import { join } from 'path'
import os from 'os'
import chalk from 'chalk'

/**
 * Set global proxy environments
 */
export const proxySet = () => {
  const proxyCmd = join(os.homedir(), 'proxy-cmd')
  const proxyUrlFile = join(proxyCmd, '.proxy-url')
  const noProxyFile = join(proxyCmd, '.no-proxy')
  ensureFileSync(proxyUrlFile)
  ensureFileSync(noProxyFile)
  const purl = readFileSync(proxyUrlFile, 'utf-8')
  const nopx = readFileSync(noProxyFile, 'utf-8')
  
  if (purl) {
    // Windows
    if (os.platform() === 'win32') {
      try {
        execSync(`setx HTTP_PROXY "${purl}" /M`, { stdio: 'inherit' })
      } catch {}
      try {
        execSync(`setx HTTPS_PROXY "${purl}" /M`, { stdio: 'inherit' })
      } catch {}
      try {
        execSync(`setx NO_PROXY "${nopx}" /M`, { stdio: 'inherit' })
      } catch {}
    }
    // MacOS
    else {
      const wtAliasInRcFile = (rcFile: string) => {
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
        if (rcTpl.match(/NO_PROXY/)) {
          rcTpl = rcTpl.replace(/^\s*#?\s*export NO_PROXY\s*=\s*.*/mg, `export NO_PROXY="${nopx}"`)
        } else {
          rcTpl = `${rcTpl}\nexport NO_PROXY="${nopx}"`
        }
        writeFileSync(rcFile, rcTpl)
        try {
          execSync(`type srouce > /dev/null 2>&1 && source ${rcFile}`, { stdio: 'inherit' })
        } catch {}
      }
      // MacOS
      if (os.platform() === 'darwin') {
        const zshrc = join(os.homedir(), '.zshrc')
        const bashrc = join(os.homedir(), '.bashrc')
        wtAliasInRcFile(zshrc)
        wtAliasInRcFile(bashrc)
      }
      // Linux
      else {
        const bashrc = join(os.homedir(), '.bashrc')
        wtAliasInRcFile(bashrc)
      }
    }
    console.log(chalk.green(`Success set proxy env to: ${purl}`))
  } else {
    console.log(chalk.red('Plese set proxy url first, run: `proxy-url http://proxy-ip:port`'))
  }
}
