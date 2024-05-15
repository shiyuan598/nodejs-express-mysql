import { Request, Response } from "express";
import multer from "multer";
import {getContentType} from "../utils/fileTool";
import Reply from "../model/reply.model";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    response.status(500).json({
        code: 1,
        msg: err.toString()
    });
};

export const addReply = async (request: Request, response: Response) => {
    const { issueId, content } = request.body;
    const attachment = request.file?.buffer;
    const filename = request.file?.originalname;
    const reply = new Reply({
        issueId,
        content,
        attachment,
        filename
    });
    try {
        const data = await Reply.create(reply);
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const updateReply = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const { content } = request.body;
    const attachment = request.file?.buffer;
    const filename = request.file?.originalname;
    const reply = new Reply({
        content,
        attachment,
        filename
    });
    try {
        const data = await Reply.update(id, reply);
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const deleteReply = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    try {
        const data = await Reply.delete(id);
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const getAttachmentById = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    try {
        const result = await Reply.getAttachmentById(id);
        const { attachment, filename } = result;

        if (attachment) {
            response.set("Content-Type", getContentType(filename));
            response.send(attachment);
        } else {
            errorHandler(response, new Error("Attachment not found"));
        }
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const uploadMiddleware = upload.single("attachment");
