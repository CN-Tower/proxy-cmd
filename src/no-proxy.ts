#!/usr/bin/env node

import { execSync } from 'child_process'
import { join, basename } from 'path'
import { ensureFileSync, writeFileSync, readFileSync } from 'fs-extra'
import os from 'os'
import chalk from 'chalk'

/**
 * Set or show NO_PROXY config
 */
export const noProxy = () => {
  const proxyCmd = join(os.homedir(), 'proxy-cmd')
  const noProxyFile = join(proxyCmd, '.no-proxy')
  ensureFileSync(noProxyFile)

  let [x, cmd, n, noProxy] = process.argv
  x = basename(x)
  if (x === 'proxy-cmd' || x === 'proxy') noProxy = n
  
  // Set NO_PROXY config
  if (noProxy) {
    const nopx = noProxy === 'del' ? '' : noProxy
    writeFileSync(noProxyFile, nopx)
    // Windows
    if (os.platform() === 'win32') {
      // Set PROXY_NOC
      try {
        execSync(`setx PROXY_NOC "${nopx}" /M`, { stdio: 'inherit' })
      } catch {}
    }
    // MacOS or Linux
    else {
      const wtAliasInRcFile = (rcFile: string) => {
        ensureFileSync(rcFile)
        let rcTpl = readFileSync(rcFile, 'utf-8')
        // Set PROXY_NOC
        if (rcTpl.match(/^(export\s*)?PROXY_NOC\s*=.*$/gm)) {
          rcTpl = rcTpl.replace(/^(export\s*)?PROXY_NOC\s*=.*$/gm, `export PROXY_NOC='${nopx}'`)
        } else {
          rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/gm, (mt) => `${mt}\nexport PROXY_NOC='${nopx}'`)
        }
        if (rcTpl.match(/^\s*#?\s*export no_proxy/im)) {
          rcTpl = rcTpl.replace(/^\s*(#?\s*)export no_proxy\s*=\s*.*/img, `$1export no_proxy="${nopx}"`)
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
    console.log(`NO_PROXY config set to: ${chalk.cyan(nopx)}`)
  }
  // Show NO_PROXY config
  else {
    const noPrx = readFileSync(noProxyFile, 'utf-8')
    console.log(`Current NO_PROXY config is: ${chalk.cyan(noPrx)}`)
  }
}
