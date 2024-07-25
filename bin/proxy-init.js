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
    const proxyUrl = (0, path_1.join)(proxyCmd, '.proxy-url');
    (0, fs_extra_1.ensureFileSync)(proxyUrl);
    let purl = (0, fs_extra_1.readFileSync)(proxyUrl, 'utf-8');
    let [x, cmd, init, url] = process.argv;
    if (x === 'proxy-cmd')
        url = init;
    if (url && url.match(/^https?:\/\/[\d.:]+$/gm)) {
        (0, fs_extra_1.writeFileSync)(proxyUrl, url);
        purl = url;
        console.log(`Proxy url set to: ${chalk_1.default.cyan(url)}`);
    }
    // Windows
    if (os_1.default.platform() === 'win32') {
        // Set PROXY_URL
        try {
            (0, child_process_1.execSync)(`setx PROXY_URL "${purl}" /M`, { stdio: 'inherit' });
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
        const aliasPs1D = (0, path_1.join)(os_1.default.homedir(), 'Documents/WindowsPowerShell');
        (0, fs_extra_1.ensureDirSync)(aliasPs1D);
        const aliasPs1T = (0, path_1.join)(aliasPs1D, 'Microsoft.PowerShell_profile.ps1');
        if (!(0, fs_extra_1.existsSync)(aliasPs1T)) {
            (0, fs_extra_1.copyFileSync)(aliasPs1S, aliasPs1T);
        }
        else {
            const pwPs1 = (0, fs_extra_1.readFileSync)(aliasPs1T, 'utf-8');
            if (!pwPs1.match(/Set-Alias proxy-off proxyOff/)) {
                (0, fs_extra_1.writeFileSync)(aliasPs1T, `${pwPs1}\n${(0, fs_extra_1.readFileSync)(aliasPs1S, 'utf-8')}`);
            }
        }
    }
    // MacOS orLinux
    else {
        const wtAliasInRcFile = (rcFile) => {
            (0, fs_extra_1.ensureFileSync)(rcFile);
            let rcTpl = (0, fs_extra_1.readFileSync)(rcFile, 'utf-8');
            // Set PROXY_URL
            if (rcTpl.match(/^(export\s*)?PROXY_URL\s*=.*$/gm)) {
                rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/gm, `export PROXY_URL='${purl}'`);
            }
            else {
                rcTpl = `${rcTpl}\nexport PROXY_URL='${purl}'`;
            }
            // Set alias proxy-on
            const cmdOn = `alias proxy-on="export HTTP_PROXY='$PROXY_URL' && export HTTPS_PROXY='$PROXY_URL'"`;
            if (rcTpl.match(/^\s*alias proxy-on/gm)) {
                rcTpl = rcTpl.replace(/^\s*alias proxy-on.*$/gm, cmdOn);
            }
            else {
                rcTpl = `${rcTpl}\n${cmdOn}`;
            }
            // Set alias proxy-off
            const cmdOff = `alias proxy-off="unset HTTP_PROXY && unset HTTPS_PROXY"`;
            if (rcTpl.match(/^\s*alias proxy-off/gm)) {
                rcTpl = rcTpl.replace(/^\s*alias proxy-off.*$/gm, cmdOff);
            }
            else {
                rcTpl = `${rcTpl}\n${cmdOff}`;
            }
            (0, fs_extra_1.writeFileSync)(rcFile, rcTpl);
            (0, child_process_1.execSync)(`source ${rcFile}`, { stdio: 'inherit' });
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
