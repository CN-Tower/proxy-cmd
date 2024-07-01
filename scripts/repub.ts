import { execSync } from 'child_process'
import { dirname } from 'path'
import chalk from 'chalk'

console.log(`Run: ${chalk.cyan('npm run build')}`)
execSync(`npm run build`, { cwd: dirname(__dirname), stdio: 'inherit' })
console.log(`Run: ${chalk.cyan('npm uninstall -g proxy-cmd')}`)
execSync(`npm uninstall -g proxy-cmd`, { cwd: dirname(__dirname), stdio: 'inherit' })
console.log(`\nRun: ${chalk.cyan('npm install -g .')}`)
execSync(`npm install -g .`, { cwd: dirname(__dirname), stdio: 'inherit' })

console.log(`\n${chalk.green('Repub success.')}`)
