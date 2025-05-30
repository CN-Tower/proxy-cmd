#!/usr/bin/env node

import { execSync } from 'child_process'
import { join, basename } from 'path'
import {
  copyFileSync,
  ensureDirSync,
  ensureFileSync,
  writeFileSync,
  existsSync,
  readFileSync,
  removeSync,
} from 'fs-extra'
import os from 'os'
import chalk from 'chalk'

/**
 * Init proxy-cmd
 */
export const proxyInit = () => {
  const proxyCmd = join(os.homedir(), 'proxy-cmd')
  ensureDirSync(proxyCmd)
  const proxyUrlFile = join(proxyCmd, '.proxy-url')
  ensureFileSync(proxyUrlFile)
  const noProxyFile = join(proxyCmd, '.no-proxy')
  ensureFileSync(noProxyFile)

  let purl = readFileSync(proxyUrlFile, 'utf-8')
  let nopx = readFileSync(noProxyFile, 'utf-8')
  let [x, cmd, init, url, noProxy] = process.argv
  x = basename(x)
  if (x === 'proxy-cmd' || x === 'proxy') {
    noProxy = url
    url = init
  }
  if (url && url.match(/^https?:\/\/[\d.:]+$/gm)) {
    writeFileSync(proxyUrlFile, url)
    purl = url
    console.log(`Proxy url set to: ${chalk.cyan(url)}`)
  }
  if (noProxy) {
    if (noProxy === 'del') {
      nopx = ''
    } else {
      nopx = noProxy
    }
    writeFileSync(noProxyFile, nopx)
    console.log(`NO_PROXY config set to: ${chalk.cyan(nopx)}`)
  }

  // Windows
  if (os.platform() === 'win32') {
    // Set PROXY_URL
    try {
      execSync(`setx PROXY_URL "${purl}" /M`, { stdio: 'inherit' })
    } catch {}
    // Set PROXY_NOC
    try {
      execSync(`setx PROXY_NOC "${nopx}" /M`, { stdio: 'inherit' })
    } catch {}
    // Set cmd alias
    const aliasBat = join(proxyCmd, 'alias.bat')
    if (existsSync(aliasBat)) removeSync(aliasBat)
    copyFileSync(join(__dirname, 'alias.bat'), aliasBat)
    try {
      execSync(
        `REG add "HKEY_CURRENT_USER\\Software\\Microsoft\\Command Processor" /v AutoRun /t REG_SZ /d "${aliasBat}" /f`,
        { stdio: 'inherit' }
      )
    } catch {}
    // Set powershell alias
    const aliasPs1S = join(__dirname, 'Microsoft.PowerShell_profile.ps1')
    const aliasPs1D = join(os.homedir(), 'Documents/WindowsPowerShell')
    ensureDirSync(aliasPs1D)
    const aliasPs1T = join(aliasPs1D, 'Microsoft.PowerShell_profile.ps1')
    if (!existsSync(aliasPs1T)) {
      copyFileSync(aliasPs1S, aliasPs1T)
    } else {
      const pwPs1 = readFileSync(aliasPs1T, 'utf-8')
      // Init pwPs1
      if (!pwPs1.match(/Set-Alias proxy-off proxyOff/)) {
        writeFileSync(aliasPs1T, `${pwPs1}\n${readFileSync(aliasPs1S, 'utf-8')}`)
      }
      // Add NO_PROXY
      else {
        if (!pwPs1.match(/\$env:NO_PROXY = \$env:PROXY_NOC/)) {
          const pwPs1New = pwPs1
            .replace(/\$env:HTTPS_PROXY = \$env:PROXY_URL/, (mt) => {
              return `${mt}\n  $env:NO_PROXY = $env:PROXY_NOC`
            })
            .replace(/Remove-Item Env:HTTPS_PROXY/, (mt) => {
              return `${mt}\n  Remove-Item Env:NO_PROXY`
            })
          writeFileSync(aliasPs1T, pwPs1New)
        }
      }
    }
  }
  // MacOS or Linux
  else {
    const wtAliasInRcFile = (rcFile: string) => {
      ensureFileSync(rcFile)
      let rcTpl = readFileSync(rcFile, 'utf-8')
      // Set PROXY_URL
      if (rcTpl.match(/^(export\s*)?PROXY_URL\s*=.*$/igm)) {
        rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/igm, `export PROXY_URL='${purl}'`)
      } else {
        if (rcTpl && !rcTpl.startsWith('\n')) rcTpl = `${rcTpl}\n`
        rcTpl = `${rcTpl}export PROXY_URL='${purl}'`
      }
      // Set PROXY_NOC
      if (rcTpl.match(/^(export\s*)?PROXY_NOC\s*=.*$/igm)) {
        rcTpl = rcTpl.replace(/^(export\s*)?PROXY_NOC\s*=.*$/igm, `export PROXY_NOC='${nopx}'`)
      } else {
        rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/gm, (mt) => `${mt}\nexport PROXY_NOC='${nopx}'`)
      }
      // Set alias proxy-on
      const cmdOn = `alias proxy-on="export http_proxy='$PROXY_URL' && export https_proxy='$PROXY_URL' && export no_proxy='$PROXY_NOC'"`
      if (rcTpl.match(/^\s*alias proxy-on/gm)) {
        rcTpl = rcTpl.replace(/^\s*alias proxy-on.*$/gm, cmdOn)
      } else {
        rcTpl = `${rcTpl}\n${cmdOn}`
      }
      // Set alias proxy-off
      const cmdOff = `alias proxy-off="unset http_proxy && unset https_proxy && unset no_proxy"`
      if (rcTpl.match(/^\s*alias proxy-off/gm)) {
        rcTpl = rcTpl.replace(/^\s*alias proxy-off.*$/gm, cmdOff)
      } else {
        rcTpl = `${rcTpl}\n${cmdOff}`
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
  console.log(
    chalk.green(`proxy-cmd inited, restart your terminal and run \`proxy-on\` or \`proxy-off\` to switch proxy`)
  )
}
