#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noProxy = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Set or show NO_PROXY config
 */
const noProxy = () => {
    const proxyCmd = (0, path_1.join)(os_1.default.homedir(), 'proxy-cmd');
    const noProxyFile = (0, path_1.join)(proxyCmd, '.no-proxy');
    (0, fs_extra_1.ensureFileSync)(noProxyFile);
    let [x, cmd, n, noProxy] = process.argv;
    if (x === 'proxy-cmd') {
        noProxy = n;
    }
    // Set NO_PROXY config
    if (noProxy) {
        const nopx = noProxy === 'del' ? '' : noProxy;
        (0, fs_extra_1.writeFileSync)(noProxyFile, nopx);
        // Windows
        if (os_1.default.platform() === 'win32') {
            // Set PROXY_NOC
            try {
                (0, child_process_1.execSync)(`setx PROXY_NOC "${nopx}" /M`, { stdio: 'inherit' });
            }
            catch { }
        }
        // MacOS or Linux
        else {
            const wtAliasInRcFile = (rcFile) => {
                (0, fs_extra_1.ensureFileSync)(rcFile);
                let rcTpl = (0, fs_extra_1.readFileSync)(rcFile, 'utf-8');
                // Set PROXY_NOC
                if (rcTpl.match(/^(export\s*)?PROXY_NOC\s*=.*$/gm)) {
                    rcTpl = rcTpl.replace(/^(export\s*)?PROXY_NOC\s*=.*$/gm, `export PROXY_NOC='${nopx}'`);
                }
                else {
                    rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/gm, (mt) => `${mt}\nexport PROXY_NOC='${nopx}'`);
                }
                if (rcTpl.match(/^\s*#?\s*export no_proxy/im)) {
                    rcTpl = rcTpl.replace(/^\s*(#?\s*)export no_proxy\s*=\s*.*/img, `$1export no_proxy="${nopx}"`);
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
        console.log(`NO_PROXY config set to: ${chalk_1.default.cyan(nopx)}`);
    }
    // Show NO_PROXY config
    else {
        const noPrx = (0, fs_extra_1.readFileSync)(noProxyFile, 'utf-8');
        console.log(`Current NO_PROXY config is: ${chalk_1.default.cyan(noPrx)}`);
    }
};
exports.noProxy = noProxy;
