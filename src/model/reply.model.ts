import sqlTool from "../utils/sqlTool";

interface IReply {
    id?: number;
    issueId?: number;
    content: string;
    attachment?: Buffer | null;
    filename?: string;
}

class Reply {
    issueId?: number;
    content: string;
    attachment?: Buffer | null;
    filename?: string;

    constructor(reply: IReply) {
        this.issueId = reply.issueId;
        this.content = reply.content;
        this.attachment = reply.attachment;
        this.filename = reply.filename;
    }

    static async create(newReply: IReply): Promise<any> {
        const { issueId, content, attachment, filename } = newReply;
        const sql = "INSERT INTO reply(`issue_id`, `content`, `attachment`, `filename`) VALUES (?, ?, ?, ?)";
        try {
            const data = await sqlTool.execute(sql, [issueId, content, attachment, filename]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async update(id: number, updatedReply: IReply): Promise<any> {
        const { content, attachment, filename } = updatedReply;
        const sql = `
          UPDATE reply 
          SET 
              content = ?,
              attachment = ?,
              filename = ?
          WHERE
              id = ?`;
        try {
            const data = await sqlTool.execute(sql, [content, attachment, filename, id]);
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
