#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyUrl = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Set or show proxy target url
 */
const proxyUrl = () => {
    const proxyCmd = (0, path_1.join)(os_1.default.homedir(), 'proxy-cmd');
    const pxUrl = (0, path_1.join)(proxyCmd, '.proxy-url');
    (0, fs_extra_1.ensureFileSync)(pxUrl);
    let [x, cmd, u, url] = process.argv;
    if (x === 'proxy-cmd')
        url = u;
    // Set proxy url
    if (url && url.match(/^https?:\/\/[\d.:]+$/gm)) {
        (0, fs_extra_1.writeFileSync)(pxUrl, url);
        // Windows
        if (os_1.default.platform() === 'win32') {
            // Set PROXY_URL
            try {
                (0, child_process_1.execSync)(`setx PROXY_URL "${url}" /M`, { stdio: 'inherit' });
            }
            catch { }
        }
        // MacOS or Linux
        else {
            const wtAliasInRcFile = (rcFile) => {
                (0, fs_extra_1.ensureFileSync)(rcFile);
                let rcTpl = (0, fs_extra_1.readFileSync)(rcFile, 'utf-8');
                // Set PROXY_URL
                if (rcTpl.match(/^(export\s*)?PROXY_URL\s*=.*$/gm)) {
                    rcTpl = rcTpl.replace(/^(export\s*)?PROXY_URL\s*=.*$/gm, `export PROXY_URL='${url}'`);
                }
                else {
                    rcTpl = `${rcTpl}\nexport PROXY_URL='${url}'`;
                }
                if (rcTpl.match(/HTTP_PROXY/)) {
                    rcTpl = rcTpl.replace(/^\s*(#?\s*)export HTTP_PROXY\s*=\s*.*/mg, `$1export HTTP_PROXY="${url}"`);
                }
                else {
                    rcTpl = `${rcTpl}\nexport HTTP_PROXY="${url}"`;
                }
                if (rcTpl.match(/HTTPS_PROXY/)) {
                    rcTpl = rcTpl.replace(/^\s*(#?\s*)export HTTPS_PROXY\s*=\s*.*/mg, `$1export HTTPS_PROXY="${url}"`);
                }
                else {
                    rcTpl = `${rcTpl}\nexport HTTPS_PROXY="${url}"`;
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
        console.log(`Proxy url set to: ${chalk_1.default.cyan(url)}`);
    }
    // Show current proxy url
    else {
        const purl = (0, fs_extra_1.readFileSync)(pxUrl, 'utf-8');
        console.log(`Current proxy url is: ${chalk_1.default.cyan(purl)}`);
    }
};
exports.proxyUrl = proxyUrl;
