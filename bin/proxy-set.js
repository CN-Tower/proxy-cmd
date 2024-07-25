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
    const proxyUrl = (0, path_1.join)(proxyCmd, '.proxy-url');
    (0, fs_extra_1.ensureFileSync)(proxyUrl);
    const purl = (0, fs_extra_1.readFileSync)(proxyUrl, 'utf-8');
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
        }
        // MacOS
        else {
            const wtAliasInRcFile = (rcFile) => {
                (0, fs_extra_1.ensureFileSync)(rcFile);
                let rcTpl = (0, fs_extra_1.readFileSync)(rcFile, 'utf-8');
                if (rcTpl.match(/HTTP_PROXY/)) {
                    rcTpl = rcTpl.replace(/^\s*#?\s*export HTTP_PROXY\s*=\s*.*/mg, `export HTTP_PROXY="${purl}"`);
                }
                else {
                    rcTpl = `${rcTpl}\nexport HTTP_PROXY="${purl}"`;
                }
                if (rcTpl.match(/HTTPS_PROXY/)) {
                    rcTpl = rcTpl.replace(/^\s*#?\s*export HTTPS_PROXY\s*=\s*.*/mg, `export HTTPS_PROXY="${purl}"`);
                }
                else {
                    rcTpl = `${rcTpl}\nexport HTTPS_PROXY="${purl}"`;
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
        console.log(chalk_1.default.green(`Success set proxy env to: ${purl}`));
    }
    else {
        console.log(chalk_1.default.red('Plese set proxy url first, run: `proxy-url http://proxy-ip:port`'));
    }
};
exports.proxySet = proxySet;
