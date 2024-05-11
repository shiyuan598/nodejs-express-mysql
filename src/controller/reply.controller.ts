import { Request, Response } from "express";
import { listFiles, getReleaseInfo } from "../utils/fileTool";
import { RELEASE_FILE_PATH } from "../config";

// 响应处理
const fullFilled = (response: Response, data: object | null) => {
    response.json({
        code: 0,
        data,
        msg: "成功"
    });
};

// 异常处理
const errorHandler = (response: Response, err: Error) => {
    response &&
        response.status(500).json({
            code: 1,
            msg: err.toString()
        });
};

export const addReply = (request: Request, response: Response) => {
    try {
        const data = listFiles(RELEASE_FILE_PATH || "");
        fullFilled(response, data);
    } catch (error) {
        errorHandler(response, error as Error);
    }
};
export const deleteReply = (request: Request, response: Response) => {
    try {
        const data = listFiles(RELEASE_FILE_PATH || "");
        fullFilled(response, data);
    } catch (error) {
        errorHandler(response, error as Error);
    }
};
