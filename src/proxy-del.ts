#!/usr/bin/env node

import { execSync } from 'child_process'
import { writeFileSync, readFileSync, ensureFileSync } from 'fs-extra'
import { join } from 'path'
import os from 'os'
import chalk from 'chalk'

/**
 * Del global proxy environments
 */
export const proxyDel = () => {
  // Windows
  if (os.platform() === 'win32') {
    // HTTP_PROXY
    try {
      execSync(`REG delete HKCU\\Environment /F /V HTTP_PROXY`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`REG delete "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment" /F /V HTTP_PROXY`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`PowerShell.exe [Environment]::SetEnvironmentVariable('HTTP_PROXY', $null, 'User')`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`PowerShell.exe [Environment]::SetEnvironmentVariable('HTTP_PROXY', $null, 'User')`, { stdio: 'inherit' })
    } catch {}
    // HTTPS_PROXY
    try {
      execSync(`REG delete HKCU\\Environment /F /V HTTPS_PROXY`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`REG delete "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment" /F /V HTTPS_PROXY`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`PowerShell.exe [Environment]::SetEnvironmentVariable('HTTPS_PROXY', $null, 'Machine')`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`PowerShell.exe [Environment]::SetEnvironmentVariable('HTTPS_PROXY', $null, 'Machine')`, { stdio: 'inherit' })
    } catch {}
    // NO_PROXY
    try {
      execSync(`REG delete HKCU\\Environment /F /V NO_PROXY`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`REG delete "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment" /F /V NO_PROXY`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`PowerShell.exe [Environment]::SetEnvironmentVariable('NO_PROXY', $null, 'Machine')`, { stdio: 'inherit' })
    } catch {}
    try {
      execSync(`PowerShell.exe [Environment]::SetEnvironmentVariable('NO_PROXY', $null, 'Machine')`, { stdio: 'inherit' })
    } catch {}
  }
  // MacOS or Linux
  else {
    const wtAliasInRcFile = (rcFile: string) => {
      ensureFileSync(rcFile)
      let rc = readFileSync(rcFile, 'utf-8')
      if (rc.match(/^\s*export (http_proxy|https_proxy|no_proxy)/im)) {
        if (rc.match(/^\s*export https?_proxy/im)) {
          rc = rc.replace(/^\s*(export https?_proxy\s*=\s*.*)/img, '# $1')
          writeFileSync(rcFile, rc)
        }
        if (rc.match(/^\s*export no_proxy/im)) {
          writeFileSync(rcFile, rc.replace(/^\s*(export no_proxy\s*=\s*.*)/img, '# $1'))
        }
        try {
          execSync(`type srouce > /dev/null 2>&1 && source ${rcFile}`, { stdio: 'inherit' })
        } catch {}
      }
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
  console.log(chalk.green(`Success del proxy env`))
}
