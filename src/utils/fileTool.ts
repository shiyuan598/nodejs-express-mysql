import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import type { FileItem } from "../types/index";

// 定义要读取的目录路径 -- 测试用
const directoryPath = "/home/wangshiyuan/code/xway-docs/xway-docs-frontend/public";
const filePath = "/home/wangshiyuan/code/xway-docs/xway-docs-frontend/public/index.html";

export function listFiles(directoryPath: string): FileItem[] {
    let allFiles: FileItem[] = [];

    try {
        // 同步读取目录
        const files = fs.readdirSync(directoryPath);
        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                console.info(stats);
                const fileName = path.parse(file).name;
                allFiles.push({
                    name: fileName,
                    path: filePath
                });
            } else if (stats.isDirectory()) {
                console.info("directory:", filePath);
            }
        });
    } catch (err) {
        console.error("Error reading directory:", err);
    }
    return allFiles;
}

export function readFile(filePath: string): string | null {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        console.log(data);

        const dom = new JSDOM(data);
        const document = dom.window.document;
        console.log(document.querySelector("noscript")?.textContent);

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function extractValue(domString: string) {
    try {
        const dom = new JSDOM(domString);
        const document = dom.window.document;
        console.log(document.querySelector("noscript")?.textContent);
        return {
            content: document.querySelector("noscript")?.textContent
        };
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function getReleaseInfo(filePath: string) {
    try {
        const data = readFile(filePath);
        if (data) {
            return extractValue(data);
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}
