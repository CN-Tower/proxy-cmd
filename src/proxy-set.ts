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
        if (rcTpl.match(/^\s*#?\s*export http_proxy/im)) {
          rcTpl = rcTpl.replace(/^\s*#?\s*export http_proxy\s*=\s*.*/img, `export http_proxy="${purl}"`)
        } else {
          rcTpl = `${rcTpl}\nexport http_proxy="${purl}"`
        }
        if (rcTpl.match(/^\s*#?\s*export https_proxy/im)) {
          rcTpl = rcTpl.replace(/^\s*#?\s*export https_proxy\s*=\s*.*/img, `export https_proxy="${purl}"`)
        } else {
          rcTpl = `${rcTpl}\nexport https_proxy="${purl}"`
        }
        if (rcTpl.match(/^\s*#?\s*export no_proxy/im)) {
          rcTpl = rcTpl.replace(/^\s*#?\s*export no_proxy\s*=\s*.*/img, `export no_proxy="${nopx}"`)
        } else {
          rcTpl = `${rcTpl}\nexport no_proxy="${nopx}"`
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
