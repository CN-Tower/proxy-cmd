#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyDel = void 0;
const child_process_1 = require("child_process");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Del global proxy environments
 */
const proxyDel = () => {
    // Windows
    if (os_1.default.platform() === 'win32') {
        try {
            (0, child_process_1.execSync)(`REG delete HKCU\\Environment /F /V HTTP_PROXY`, { stdio: 'inherit' });
        }
        catch { }
        try {
            (0, child_process_1.execSync)(`REG delete "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment" /F /V HTTP_PROXY`, { stdio: 'inherit' });
        }
        catch { }
        try {
            (0, child_process_1.execSync)(`PowerShell.exe [Environment]::SetEnvironmentVariable('HTTP_PROXY', $null, 'User')`, { stdio: 'inherit' });
        }
        catch { }
        try {
            (0, child_process_1.execSync)(`PowerShell.exe [Environment]::SetEnvironmentVariable('HTTP_PROXY', $null, 'User')`, { stdio: 'inherit' });
        }
        catch { }
        try {
            (0, child_process_1.execSync)(`REG delete HKCU\\Environment /F /V HTTPS_PROXY`, { stdio: 'inherit' });
        }
        catch { }
        try {
            (0, child_process_1.execSync)(`REG delete "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment" /F /V HTTPS_PROXY`, { stdio: 'inherit' });
        }
        catch { }
        try {
            (0, child_process_1.execSync)(`PowerShell.exe [Environment]::SetEnvironmentVariable('HTTPS_PROXY', $null, 'Machine')`, { stdio: 'inherit' });
        }
        catch { }
        try {
            (0, child_process_1.execSync)(`PowerShell.exe [Environment]::SetEnvironmentVariable('HTTPS_PROXY', $null, 'Machine')`, { stdio: 'inherit' });
        }
        catch { }
    }
    // MacOS or Linux
    else {
        const wtAliasInRcFile = (rcFile) => {
            (0, fs_extra_1.ensureFileSync)(rcFile);
            const rc = (0, fs_extra_1.readFileSync)(rcFile, 'utf-8');
            if (rc.match(/HTTP_PROXY|HTTPS_PROXY/)) {
                (0, fs_extra_1.writeFileSync)(rcFile, rc.replace(/^\s*(export HTTPS?_PROXY\s*=\s*.*)/mg, '# $1'));
                try {
                    (0, child_process_1.execSync)(`source ${rcFile}`, { stdio: 'inherit' });
                }
                finally { }
            }
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
    console.log(chalk_1.default.green(`Success del proxy env`));
};
exports.proxyDel = proxyDel;
