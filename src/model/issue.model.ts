import sqlTool from "../utils/sqlTool";

interface Issue {
  id?: number;
  version: string;
  title: string;
  content: string;
  attachment: string | null;
  createtime?: string;
  updatetime?: string;
  state: string;
  desc: string | null;
}

class Issue {
  constructor(issue: Issue) {
    this.version = issue.version;
    this.title = issue.title;
    this.content = issue.content;
    this.attachment = issue.attachment;
    this.state = issue.state;
    this.desc = issue.desc;
  }

  static create(newIssue: Issue, result: (err: Error | null, data: any) => void): void {
    try {
        const {version, title, content, attachment, state, desc} = newIssue;
        const sql = "INSERT INTO issue(`version`, `title`, `content`, `attachment`, `state`, `desc`) VALUES (?, ?, ?, ?, ?, ?)";
        sqlTool.execute(sql, [version, title, content, attachment, state, desc]);
        
    } catch (error) {
        
    }
  }

//   static findById(id: number, result: (err: Error | null, data: any) => void): void {
//     sql.query(`SELECT * FROM issue WHERE id = ${id}`, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }

//       if (res.length) {
//         console.log("found issue: ", res[0]);
//         result(null, res[0]);
//         return;
//       }

//       // not found issue with the id
//       result({ kind: "not_found" }, null);
//     });
//   }

//   static getAll(title: string, result: (err: Error | null, data: any) => void): void {
//     let query = "SELECT * FROM issue";

//     if (title) {
//       query += ` WHERE title LIKE '%${title}%'`;
//     }

//     sql.query(query, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       console.log("issues: ", res);
//       result(null, res);
//     });
//   }

//   static updateById(id: number, issue: Issue, result: (err: Error | null, data: any) => void): void {
//     sql.query(
//       "UPDATE issue SET version = ?, title = ?, content = ?, attachment = ?, state = ?, `desc` = ? WHERE id = ?",
//       [issue.version, issue.title, issue.content, issue.attachment, issue.state, issue.desc, id],
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }

//         if (res.affectedRows == 0) {
//           // not found issue with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }

//         console.log("updated issue: ", { id: id, ...issue });
//         result(null, { id: id, ...issue });
//       }
//     );
//   }

//   static remove(id: number, result: (err: Error | null, data: any) => void): void {
//     sql.query("DELETE FROM issue WHERE id = ?", id, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found issue with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("deleted issue with id: ", id);
//       result(null, res);
//     });
//   }
}

export default Issue;
