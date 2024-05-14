import sqlTool from "../utils/sqlTool";

interface Issue {
    id?: number;
    version?: string;
    title?: string;
    content: string;
    attachment?: Buffer | null;
    filename?: string;
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
        const columns = [];
        const values = [];
        const params = [];

        if (newIssue.version !== undefined) {
            columns.push('`version`');
            values.push('?');
            params.push(newIssue.version);
        }
        if (newIssue.title !== undefined) {
            columns.push('`title`');
            values.push('?');
            params.push(newIssue.title);
        }
        if (newIssue.content !== undefined) {
            columns.push('`content`');
            values.push('?');
            params.push(newIssue.content);
        }
        if (newIssue.attachment !== undefined) {
            columns.push('`attachment`');
            values.push('?');
            params.push(newIssue.attachment);
        }
        if (newIssue.filename !== undefined) {
            columns.push('`filename`');
            values.push('?');
            params.push(newIssue.filename);
        }

        const sql = `INSERT INTO issue(${columns.join(', ')}) VALUES (${values.join(', ')})`;
        try {
            const data = await sqlTool.execute(sql, params);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getAll(version?: string, start?: string, end?: string): Promise<any> {
        let sql = `SELECT i.id AS issueId, i.version AS issueVersion, i.title AS issueTitle, 
                    i.content AS issueContent, i.filename AS issueFilename,
                    i.createtime AS issueCreatetime, i.updatetime AS issueUpdatetime, 
                    i.state AS issueState,
                    r.id AS replyId, r.issue_id AS replyIssueId, 
                    r.content AS replyContent, r.filename AS replyFilename
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
        const columns = [];
        const params = [];

        if (updatedIssue.version !== undefined) {
            columns.push('version = ?');
            params.push(updatedIssue.version);
        }
        if (updatedIssue.title !== undefined) {
            columns.push('title = ?');
            params.push(updatedIssue.title);
        }
        if (updatedIssue.content !== undefined) {
            columns.push('content = ?');
            params.push(updatedIssue.content);
        }
        if (updatedIssue.attachment !== undefined) {
            columns.push('attachment = ?');
            params.push(updatedIssue.attachment);
        }
        if (updatedIssue.filename !== undefined) {
            columns.push('filename = ?');
            params.push(updatedIssue.filename);
        }

        columns.push('updatetime = CURRENT_TIMESTAMP');
        params.push(id);
        
        const sql = `
          UPDATE issue 
          SET ${columns.join(', ')}
          WHERE id = ?`;
        try {
            const data = await sqlTool.execute(sql, params);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number): Promise<any> {
        const sql = `DELETE FROM issue WHERE id = ?`;
        try {
            const data = await sqlTool.execute(sql, [id]);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default Issue;
