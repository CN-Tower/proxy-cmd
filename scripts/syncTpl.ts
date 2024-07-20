import { copySync } from 'fs-extra'
import { join } from 'path'
import { version } from '../package.json'
import chalk from 'chalk'

copySync(join(__dirname, '../src/alias.bat'), join(__dirname, '../bin/alias.bat'))
copySync(join(__dirname, '../src/Microsoft.PowerShell_profile.ps1'), join(__dirname, '../bin/Microsoft.PowerShell_profile.ps1'))

console.log(chalk.green(`Proxy env switcher（${chalk.cyan(`proxy-cmd@${version}`)}）build success！`))
