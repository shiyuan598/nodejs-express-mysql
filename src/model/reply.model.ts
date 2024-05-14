import sqlTool from "../utils/sqlTool";

interface IReply {
    id?: number;
    issueId?: number;
    content?: string;
    attachment?: Buffer | null;
    filename?: string;
}

class Reply {
    issueId?: number;
    content?: string;
    attachment?: Buffer | null;
    filename?: string;

    constructor(reply: IReply) {
        this.issueId = reply.issueId;
        this.content = reply.content;
        this.attachment = reply.attachment;
        this.filename = reply.filename;
    }

    static async create(newReply: IReply): Promise<any> {
        const columns = [];
        const values = [];
        const params = [];

        if (newReply.issueId !== undefined) {
            columns.push("`issue_id`");
            values.push("?");
            params.push(newReply.issueId);
        }
        if (newReply.content !== undefined) {
            columns.push("`content`");
            values.push("?");
            params.push(newReply.content);
        }
        if (newReply.attachment !== undefined) {
            columns.push("`attachment`");
            values.push("?");
            params.push(newReply.attachment);
        }
        if (newReply.filename !== undefined) {
            columns.push("`filename`");
            values.push("?");
            params.push(newReply.filename);
        }

        const sql = `INSERT INTO reply(${columns.join(", ")}) VALUES (${values.join(", ")})`;
        try {
            const data = await sqlTool.execute(sql, params);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async update(id: number, updatedReply: IReply): Promise<any> {
        const columns = [];
        const params = [];

        if (updatedReply.content !== undefined) {
            columns.push("content = ?");
            params.push(updatedReply.content);
        }
        if (updatedReply.attachment !== undefined) {
            columns.push("attachment = ?");
            params.push(updatedReply.attachment);
        }
        if (updatedReply.filename !== undefined) {
            columns.push("filename = ?");
            params.push(updatedReply.filename);
        }

        params.push(id);
        const sql = `
          UPDATE reply 
          SET ${columns.join(", ")}
          WHERE id = ?`;

        try {
            const data = await sqlTool.execute(sql, params);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number): Promise<any> {
        const sql = `DELETE FROM reply WHERE id = ?`;
        try {
            const data = await sqlTool.execute(sql, [id]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getAttachmentById(id: number): Promise<any> {
        const sql = `SELECT attachment, filename FROM reply WHERE id = ?`;
        try {
            const data = await sqlTool.execute(sql, [id]);
            return data[0];
        } catch (error) {
            throw error;
        }
    }
}

export default Reply;
