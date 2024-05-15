import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import type { FileItem } from "../types/index";

export function listFiles(directoryPath: string): FileItem[] {
    let allFiles: FileItem[] = [];

    try {
        // 同步读取目录
        console.info("directoryPath:", directoryPath);
        const files = fs.readdirSync(directoryPath);
        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
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
        return {
            content: document.querySelector("table")?.outerHTML
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

export function getContentType(filename: string) {
    let contentType = "application/octet-stream";
    if (filename) {
        const ext = filename.split(".").pop()?.toLowerCase();
        switch (ext) {
            case "jpg":
            case "jpeg":
                contentType = "image/jpeg";
                break;
            case "png":
                contentType = "image/png";
                break;
            case "bmp":
                contentType = "image/bmp";
                break;
            case "webp":
                contentType = "image/webp";
                break;
        }
    }
    return contentType;
}
