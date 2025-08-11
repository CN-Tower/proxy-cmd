#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyInit = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Init proxy-cmd
 */
const proxyInit = () => {
    const proxyCmd = (0, path_1.join)(os_1.default.homedir(), 'proxy-cmd');
    (0, fs_extra_1.ensureDirSync)(proxyCmd);
    const proxyUrlFile = (0, path_1.join)(proxyCmd, '.proxy-url');
    (0, fs_extra_1.ensureFileSync)(proxyUrlFile);
    const noProxyFile = (0, path_1.join)(proxyCmd, '.no-proxy');
    (0, fs_extra_1.ensureFileSync)(noProxyFile);
    let purl = (0, fs_extra_1.readFileSync)(proxyUrlFile, 'utf-8');
    let nopx = (0, fs_extra_1.readFileSync)(noProxyFile, 'utf-8');
    let [x, cmd, init, url, noProxy] = process.argv;
    x = (0, path_1.basename)(x);
    if (x === 'proxy-cmd' || x === 'proxy') {
        noProxy = url;
        url = init;
    }
    if (url && url.match(/^https?:\/\/[\d.:]+$/gm)) {
        (0, fs_extra_1.writeFileSync)(proxyUrlFile, url);
        purl = url;
        console.log(`Proxy url set to: ${chalk_1.default.cyan(url)}`);
    }
    if (noProxy) {
        if (noProxy === 'del') {
            nopx = '';
        }
        else {
            nopx = noProxy;
        }
        (0, fs_extra_1.writeFileSync)(noProxyFile, nopx);
        console.log(`NO_PROXY config set to: ${chalk_1.default.cyan(nopx)}`);
    }
    // Windows
    if (os_1.default.platform() === 'win32') {
        // Set PROXY_URL
        try {
            (0, child_process_1.execSync)(`setx PROXY_URL "${purl}" /M`, { stdio: 'inherit' });
        }
        catch { }
        // Set PROXY_NOC
        try {
            (0, child_process_1.execSync)(`setx PROXY_NOC "${nopx}" /M`, { stdio: 'inherit' });
        }
        catch { }
        // Set cmd alias
        const aliasBat = (0, path_1.join)(proxyCmd, 'alias.bat');
        if ((0, fs_extra_1.existsSync)(aliasBat))
            (0, fs_extra_1.removeSync)(aliasBat);
        (0, fs_extra_1.copyFileSync)((0, path_1.join)(__dirname, 'alias.bat'), aliasBat);
        try {
            (0, child_process_1.execSync)(`REG add "HKEY_CURRENT_USER\\Software\\Microsoft\\Command Processor" /v AutoRun /t REG_SZ /d "${aliasBat}" /f`, { stdio: 'inherit' });
        }
        catch { }
        // Set powershell alias
        const aliasPs1S = (0, path_1.join)(__dirname, 'Microsoft.PowerShell_profile.ps1');
        const setupPowerShellProfile = (profilePath) => {
            (0, fs_extra_1.ensureDirSync)(profilePath);
            const aliasPs1T = (0, path_1.join)(profilePath, 'Microsoft.PowerShell_profile.ps1');
            if (!(0, fs_extra_1.existsSync)(aliasPs1T)) {
                (0, fs_extra_1.copyFileSync)(aliasPs1S, aliasPs1T);
            }
            else {
                const pwPs1 = (0, fs_extra_1.readFileSync)(aliasPs1T, 'utf-8');
                // Init pwPs1
                if (!pwPs1.match(/Set-Alias proxy-off proxyOff/)) {
                    (0, fs_extra_1.writeFileSync)(aliasPs1T, `${pwPs1}\n${(0, fs_extra_1.readFileSync)(aliasPs1S, 'utf-8')}`);
                }
                // Add NO_PROXY
                else {
                    if (!pwPs1.match(/\$env:NO_PROXY = \$env:PROXY_NOC/)) {
                        const pwPs1New = pwPs1
                            .replace(/\$env:HTTPS_PROXY = \$env:PROXY_URL/, (mt) => {
                            return `${mt}\n  $env:NO_PROXY = $env:PROXY_NOC`;
                        })
                            .replace(/Remove-Item Env:HTTPS_PROXY/, (mt) => {
                            return `${mt}\n  Remove-Item Env:NO_PROXY`;
                        });
                        (0, fs_extra_1.writeFileSync)(aliasPs1T, pwPs1New);
                    }
                }
            }
        };
        // PowerShell 5.x (Windows PowerShell)
        const aliasPs1D_Win = (0, path_1.join)(os_1.default.homedir(), 'Documents/WindowsPowerShell');
        setupPowerShellProfile(aliasPs1D_Win);
        // PowerShell 7.x (PowerShell Core)
        const aliasPs1D_Core = (0, path_1.join)(os_1.default.homedir(), 'Documents/PowerShell');
        setupPowerShellProfile(aliasPs1D_Core);
    }
    // MacOS or Linux
    else {
        const wtAliasInRcFile = (rcFile) => {
            (0, fs_extra_1.ensureFileSync)(rcFile);
            let rcTpl = (0, fs_extra_1.readFileSync)(rcFile, 'utf-8');
            // Set PROXY_URL
            if (rcTpl.match(/^(export\s*)?PROXY_URL\s*=.*$/igm)) {
                rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/igm, `export PROXY_URL='${purl}'`);
            }
            else {
                if (rcTpl && !rcTpl.startsWith('\n'))
                    rcTpl = `${rcTpl}\n`;
                rcTpl = `${rcTpl}export PROXY_URL='${purl}'`;
            }
            // Set PROXY_NOC
            if (rcTpl.match(/^(export\s*)?PROXY_NOC\s*=.*$/igm)) {
                rcTpl = rcTpl.replace(/^(export\s*)?PROXY_NOC\s*=.*$/igm, `export PROXY_NOC='${nopx}'`);
            }
            else {
                rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/gm, (mt) => `${mt}\nexport PROXY_NOC='${nopx}'`);
            }
            // Set alias proxy-on
            const cmdOn = `alias proxy-on="export http_proxy='$PROXY_URL' && export https_proxy='$PROXY_URL' && export no_proxy='$PROXY_NOC'"`;
            if (rcTpl.match(/^\s*alias proxy-on/gm)) {
                rcTpl = rcTpl.replace(/^\s*alias proxy-on.*$/gm, cmdOn);
            }
            else {
                rcTpl = `${rcTpl}\n${cmdOn}`;
            }
            // Set alias proxy-off
            const cmdOff = `alias proxy-off="unset http_proxy && unset https_proxy && unset no_proxy"`;
            if (rcTpl.match(/^\s*alias proxy-off/gm)) {
                rcTpl = rcTpl.replace(/^\s*alias proxy-off.*$/gm, cmdOff);
            }
            else {
                rcTpl = `${rcTpl}\n${cmdOff}`;
            }
            (0, fs_extra_1.writeFileSync)(rcFile, rcTpl);
            try {
                (0, child_process_1.execSync)(`type srouce > /dev/null 2>&1 && source ${rcFile}`, { stdio: 'inherit' });
            }
            catch { }
        };
        // MacOS
        if (os_1.default.platform() === 'darwin') {
            const zshrc = (0, path_1.join)(os_1.default.homedir(), '.zshrc');
            const bashrc = (0, path_1.join)(os_1.default.homedir(), '.bashrc');
            wtAliasInRcFile(zshrc);
            wtAliasInRcFile(bashrc);
        }
        // Linux
        else {
            const bashrc = (0, path_1.join)(os_1.default.homedir(), '.bashrc');
            wtAliasInRcFile(bashrc);
        }
    }
    console.log(chalk_1.default.green(`proxy-cmd inited, restart your terminal and run \`proxy-on\` or \`proxy-off\` to switch proxy`));
};
exports.proxyInit = proxyInit;
