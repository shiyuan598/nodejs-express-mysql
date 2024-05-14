import { Request, Response } from "express";
import Reply from "../model/reply.model";

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
    const reply = new Reply({
        issueId: request.body.issueId,
        content: request.body.content,
        attachment: request.body.attachment
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
    const reply = new Reply({
        content: request.body.content,
        attachment: request.body.attachment
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
