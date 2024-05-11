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
    response &&
        response.status(500).json({
            code: 1,
            msg: err.toString()
        });
};

export const getIssueList = (request: Request, response: Response) => {
    try {
        const issue = new Issue({
            version: "1.0",
            title: "Example Issue",
            content: "This is an example issue content.",
            attachment: null, // 如果有附件，设置附件路径；如果没有附件，设置为 null
            state: "open",
            desc: "This is an example issue description."
        });
        Issue.create(issue, (err: Error | null, data: any) => {
            if (err) {
                errorHandler(response, err);
            } else {
                fullFilled(response, data);
            }
        });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const addIssue = (request: Request, response: Response) => {
    try {
        const issue = new Issue({
            version: "1.0",
            title: "Example Issue",
            content: "This is an example issue content.",
            attachment: null, // 如果有附件，设置附件路径；如果没有附件，设置为 null
            state: "open",
            desc: "This is an example issue description."
        });
        Issue.create(issue, (err: Error | null, data: any) => {
            if (err) {
                errorHandler(response, err);
            } else {
                fullFilled(response, data);
            }
        });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};
export const updateIssue = (request: Request, response: Response) => {
    try {
        const issue = new Issue({
            version: "1.0",
            title: "Example Issue",
            content: "This is an example issue content.",
            attachment: null, // 如果有附件，设置附件路径；如果没有附件，设置为 null
            state: "open",
            desc: "This is an example issue description."
        });
        Issue.create(issue, (err: Error | null, data: any) => {
            if (err) {
                errorHandler(response, err);
            } else {
                fullFilled(response, data);
            }
        });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};
export const deleteIssue = (request: Request, response: Response) => {
    try {
        const issue = new Issue({
            version: "1.0",
            title: "Example Issue",
            content: "This is an example issue content.",
            attachment: null, // 如果有附件，设置附件路径；如果没有附件，设置为 null
            state: "open",
            desc: "This is an example issue description."
        });
        Issue.create(issue, (err: Error | null, data: any) => {
            if (err) {
                errorHandler(response, err);
            } else {
                fullFilled(response, data);
            }
        });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};
