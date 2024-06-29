#!/usr/bin/env node

const { execSync } = require('child_process')
const { writeFileSync, readFileSync, ensureFileSync } = require('fs-extra')
const { join } = require('path')
const os = require('os')
const chalk = require('chalk')

// Windows
if (os.platform() === 'win32') {
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
}
// MacOS
else if (os.platform() === 'darwin') {
  const rcFile = join(process.HOME, '.zshrc')
  ensureFileSync(rcFile)
  const rc = readFileSync(rcFile, 'utf-8')
  if (rc.match(/HTTP_PROXY|HTTPS_PROXY/)) {
    writeFileSync(rcFile, rc.replace(/^\s*(HTTPS?_PROXY\s*=\s*.*)/mg, '# $1'))
    execSync(`source ${rcFile}`)
  }
  execSync(`unset HTTP_PROXY`, { stdio: 'inherit' })
  execSync(`unset HTTPS_PROXY`, { stdio: 'inherit' })
}
console.log(chalk.green(`Success del proxy env`))
