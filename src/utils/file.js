const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

// 定义要读取的目录路径
const directoryPath = "/home/wangshiyuan/code/xway-docs/xway-docs-frontend/public";

function readFilesSync(directoryPath) {
    let allFiles = [];

    try {
        // 同步读取目录
        const files = fs.readdirSync(directoryPath);

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
                console.info(stats);
                const fileName = path.parse(file).name;
                allFiles.push({
                    name: fileName,
                    path: filePath,
                });
            } else if (stats.isDirectory()) {
                console.info("directory:", filePath);
            }
        });
    } catch (err) {
        console.error('Error reading directory:', err);
    }

    return allFiles;
}
const files = readFilesSync(directoryPath);
console.info(files);



const filePath = "/home/wangshiyuan/code/xway-docs/xway-docs-frontend/public/index.html";


const readFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        console.log(data);

        const dom = new JSDOM(data);
        const document = dom.window.document;
        console.log(document.querySelector("noscript").textContent);

        return document;
    } catch (err) {
        console.error(err);
        return null;
    }
}

readFile(filePath);

