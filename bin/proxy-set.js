#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxySet = void 0;
const child_process_1 = require("child_process");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Set global proxy environments
 */
const proxySet = () => {
    const proxyCmd = (0, path_1.join)(os_1.default.homedir(), 'proxy-cmd');
    const proxyUrlFile = (0, path_1.join)(proxyCmd, '.proxy-url');
    const noProxyFile = (0, path_1.join)(proxyCmd, '.no-proxy');
    (0, fs_extra_1.ensureFileSync)(proxyUrlFile);
    (0, fs_extra_1.ensureFileSync)(noProxyFile);
    const purl = (0, fs_extra_1.readFileSync)(proxyUrlFile, 'utf-8');
    const nopx = (0, fs_extra_1.readFileSync)(noProxyFile, 'utf-8');
    if (purl) {
        // Windows
        if (os_1.default.platform() === 'win32') {
            try {
                (0, child_process_1.execSync)(`setx HTTP_PROXY "${purl}" /M`, { stdio: 'inherit' });
            }
            catch { }
            try {
                (0, child_process_1.execSync)(`setx HTTPS_PROXY "${purl}" /M`, { stdio: 'inherit' });
            }
            catch { }
            try {
                (0, child_process_1.execSync)(`setx NO_PROXY "${nopx}" /M`, { stdio: 'inherit' });
            }
            catch { }
        }
        // MacOS
        else {
            const wtAliasInRcFile = (rcFile) => {
                (0, fs_extra_1.ensureFileSync)(rcFile);
                let rcTpl = (0, fs_extra_1.readFileSync)(rcFile, 'utf-8');
                if (rcTpl.match(/^\s*#?\s*export http_proxy/im)) {
                    rcTpl = rcTpl.replace(/^\s*#?\s*export http_proxy\s*=\s*.*/img, `export http_proxy="${purl}"`);
                }
                else {
                    rcTpl = `${rcTpl}\nexport http_proxy="${purl}"`;
                }
                if (rcTpl.match(/^\s*#?\s*export https_proxy/im)) {
                    rcTpl = rcTpl.replace(/^\s*#?\s*export https_proxy\s*=\s*.*/img, `export https_proxy="${purl}"`);
                }
                else {
                    rcTpl = `${rcTpl}\nexport https_proxy="${purl}"`;
                }
                if (rcTpl.match(/^\s*#?\s*export no_proxy/im)) {
                    rcTpl = rcTpl.replace(/^\s*#?\s*export no_proxy\s*=\s*.*/img, `export no_proxy="${nopx}"`);
                }
                else {
                    rcTpl = `${rcTpl}\nexport no_proxy="${nopx}"`;
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
        console.log(chalk_1.default.green(`Success set proxy env to: ${purl}`));
    }
    else {
        console.log(chalk_1.default.red('Plese set proxy url first, run: `proxy-url http://proxy-ip:port`'));
    }
};
exports.proxySet = proxySet;
