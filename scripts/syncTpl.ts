import { copySync } from 'fs-extra'
import { join } from 'path'
import { version } from '../package.json'
import chalk from 'chalk'

copySync(join(__dirname, '../src/alias.bat'), join(__dirname, '../bin/alias.bat'))

console.log(chalk.green(`命令行代理开关工具（${chalk.cyan(`proxy-cmd@${version}`)}）构建成功！`))
