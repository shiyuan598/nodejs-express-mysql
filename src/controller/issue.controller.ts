import { Request, Response } from "express";
import Issue from "../model/issue.model";
import multer from "multer";

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

export const getIssueList = async (request: Request, response: Response) => {
    const { version, start, end } = request.query;
    try {
        const data = await Issue.getAll(version?.toString(), start?.toString(), end?.toString());
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const getIssueById = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    try {
        const data = await Issue.getById(id);
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const getAttachmentById = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    try {
        const result = await Issue.getAttachmentById(id);
        const { attachment, filename } = result;

        if (attachment) {
            // 设置适当的 content-type
            let contentType = "application/octet-stream";
            if (filename) {
                const ext = filename.split('.').pop()?.toLowerCase();
                switch (ext) {
                    case 'jpg':
                    case 'jpeg':
                        contentType = 'image/jpeg';
                        break;
                    case 'png':
                        contentType = 'image/png';
                        break;
                    case 'bmp':
                        contentType = 'image/bmp';
                        break;
                    case 'webp':
                        contentType = 'image/webp';
                        break;
                }
            }
            response.set("Content-Type", contentType);
            response.send(attachment);
        } else {
            response.status(404).send("Attachment not found");
        }
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const addIssue = async (request: Request, response: Response) => {
    const { version, title, content } = request.body;
    const attachment = request.file?.buffer;
    const filename = request.file?.originalname;
    const issue = new Issue({
        version,
        title,
        content,
        attachment,
        filename
    });
    try {
        const data = await Issue.create(issue);
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const updateIssue = async (request: Request, response: Response) => {
    const id = parseInt(request.body.id);
    const { version, title, content } = request.body;
    const attachment = request.file?.buffer;
    const filename = request.file?.originalname;
    const issue = new Issue({
        version,
        title,
        content,
        attachment,
        filename
    });
    try {
        const data = await Issue.update(id, issue);
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const deleteIssue = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    try {
        const data = await Issue.delete(id);
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const uploadMiddleware = upload.single("attachment");
