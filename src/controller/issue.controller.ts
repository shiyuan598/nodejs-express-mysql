import { Request, Response } from "express";
import multer from "multer";
import { getContentType } from "../utils/fileTool";
import Issue from "../model/issue.model";

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
    const { version, start, end, limit, offset } = request.query;
    try {
        const data = await Issue.getAll(
            version?.toString(),
            start?.toString(),
            end?.toString(),
            limit ? parseInt(limit.toString(), 10) : undefined,
            offset ? parseInt(offset.toString(), 10) : undefined
        );
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
            response.set("Content-Type", getContentType(filename));
            response.send(attachment);
        } else {
            errorHandler(response, new Error("Attachment not found"));
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
    const id = parseInt(request.params.id);
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
