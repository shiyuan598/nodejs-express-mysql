import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
import { listFiles, readFile, getReleaseInfo } from "../utils/fileTool";
import { RELEASE_FILE_Path } from "../../config";
import type { FileItem } from "../types/index";
// 响应处理
const fullFilled = (response: Response, data: object | null) => {
    response.json({
        code: 0,
        data,
        msg: "成功"
    });
};

// route异常处理
const errorHandler = (response: Response, err: Error) => {
    response &&
        response.status(500).json({
            code: 1,
            msg: err.toString()
        });
};

router.get("/list", async (request: Request, response: Response) => {
    try {
        const data = listFiles(RELEASE_FILE_Path);
        fullFilled(response, data);
    } catch (error) {
        errorHandler(response, error as Error);
    }
});

router.get("/info", async (request: Request, response: Response) => {
    try {
        const filePath = request.query.path as string;
        const data = getReleaseInfo(filePath);
        fullFilled(response, data);
    } catch (error) {
        errorHandler(response, error as Error);
    }
});

export default router;
