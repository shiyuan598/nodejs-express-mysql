import sqlTool from "../utils/sqlTool";

interface Issue {
    id?: number;
    version?: string;
    title?: string;
    content: string;
    attachment?: Buffer | null;
    filename?: string; // 添加 filename 字段
    createtime?: string;
    updatetime?: string;
    state?: number;
}

class Issue {
    constructor(issue: Issue) {
        this.version = issue.version;
        this.title = issue.title;
        this.content = issue.content;
        this.attachment = issue.attachment;
        this.filename = issue.filename;
        this.state = issue.state;
    }

    static async create(newIssue: Issue): Promise<any> {
        const { version, title, content, attachment, filename } = newIssue;
        const sql = "INSERT INTO issue(`version`, `title`, `content`, `attachment`, `filename`) VALUES (?, ?, ?, ?, ?)";
        try {
            const data = await sqlTool.execute(sql, [version, title, content, attachment, filename]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getAll(version?: string, start?: string, end?: string): Promise<any> {
        let sql = `SELECT i.id AS issueId, i.version AS issueVersion, i.title AS issueTitle, 
                    i.content AS issueContent, i.attachment AS issueAttachment, i.filename AS issueFilename,
                    i.createtime AS issueCreatetime, i.updatetime AS issueUpdatetime, 
                    i.state AS issueState,
                    r.id AS replyId, r.issue_id AS replyIssueId, 
                    r.content AS replyContent, r.attachment AS replyAttachment, r.filename AS replyFilename
                FROM issue i
                LEFT JOIN reply r ON i.id = r.issue_id
                WHERE 1 = 1`;
        const params: any[] = [];

        if (version) {
            sql += ` AND i.version = ?`;
            params.push(version);
        }

        if (start) {
            sql += ` AND DATE(i.createtime) >= ?`;
            params.push(start);
        }

        if (end) {
            sql += ` AND DATE(i.createtime) <= ?`;
            params.push(end);
        }
        try {
            const data = await sqlTool.execute(sql, params);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id: number): Promise<any> {
        const sql = `
          SELECT i.id AS issueId, i.version AS issueVersion, i.title AS issueTitle, 
              i.content AS issueContent, i.filename AS issueFilename,
              i.createtime AS issueCreatetime, i.updatetime AS issueUpdatetime, 
              i.state AS issueState,
              r.id AS replyId, r.issue_id AS replyIssueId, 
              r.content AS replyContent, r.filename AS replyFilename
          FROM issue i
          LEFT JOIN reply r ON i.id = r.issue_id
          WHERE i.id = ?`;
        try {
            const data = await sqlTool.execute(sql, [id]);
            return data[0];
        } catch (error) {
            throw error;
        }
    }

    static async getAttachmentById(id: number): Promise<any> {
        const sql = `SELECT attachment, filename FROM issue WHERE id = ?`;
        try {
            const data = await sqlTool.execute(sql, [id]);
            return data[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id: number, updatedIssue: Issue): Promise<any> {
        const { version, title, content, attachment, filename } = updatedIssue;
        const sql = `
          UPDATE issue 
          SET 
              version = ?,
              title = ?,
              content = ?,
              attachment = ?,
              filename = ?,
              updatetime = CURRENT_TIMESTAMP
          WHERE
              id = ?`;
        try {
            const data = await sqlTool.execute(sql, [version, title, content, attachment, filename, id]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number): Promise<any> {
        const sql = `
          DELETE FROM issue 
          WHERE
              id = ?`;
        try {
            const data = await sqlTool.execute(sql, [id]);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default Issue;
