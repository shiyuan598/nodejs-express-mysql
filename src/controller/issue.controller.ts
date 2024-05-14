import { Request, Response } from "express";
import Issue from "../model/issue.model";

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

export const addIssue = async (request: Request, response: Response) => {
    const issue = new Issue({
        version: request.body.version,
        title: request.body.title,
        content: request.body.content,
        attachment: request.body.attachment
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
    const issue = new Issue({
        version: request.body.version,
        title: request.body.title,
        content: request.body.content,
        attachment: request.body.attachment
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
