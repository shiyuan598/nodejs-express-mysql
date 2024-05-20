import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sqlTool from "../utils/sqlTool";

const SECRET_KEY = "q;lgjiqmqq";

interface IUser {
    id?: number;
    username: string;
    password: string;
}

class User {
    username: string;
    password: string;

    constructor(user: IUser) {
        this.username = user.username;
        this.password = user.password;
    }

    static async create(newUser: IUser): Promise<any> {
        const { username, password } = newUser;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
        try {
            const data = await sqlTool.execute(sql, [username, hashedPassword]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async updatePassword(username: string, newPassword: string, currentPassword: string): Promise<any> {
        const user = await this.findByUsername(username);
        if (!user) {
            throw new Error("用户不存在");
        }
        if (!bcrypt.compareSync(currentPassword, user.password)) {
            throw new Error("当前密码错误");
        }

        const saltRounds = 10;
        const hashedNewPassword = bcrypt.hashSync(newPassword, saltRounds);

        const updateSql = "UPDATE user SET password = ? WHERE username = ?";
        try {
            await sqlTool.execute(updateSql, [hashedNewPassword, username]);
            return { message: "密码修改成功" };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number): Promise<any> {
        const sql = `DELETE FROM user WHERE id = ?`;
        try {
            const data = await sqlTool.execute(sql, [id]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async findByUsername(username: string): Promise<IUser | null> {
        const sql = "SELECT * FROM user WHERE username = ?";
        try {
            const data = await sqlTool.execute(sql, [username]);
            return data[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async saveTokenToDB(token: string, userId: number): Promise<any> {
        const sql = "INSERT INTO token (token, user_id) VALUES (?, ?)";
        try {
            const data = await sqlTool.execute(sql, [token, userId]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteTokenFromDB(token: string): Promise<any> {
        const sql = "DELETE FROM token WHERE token = ?";
        try {
            const data = await sqlTool.execute(sql, [token]);
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async verifyToken(token: string): Promise<number | null> {
        try {
            const decodedToken: any = jwt.verify(token, SECRET_KEY);
            const [rows] = await sqlTool.execute("SELECT * FROM token WHERE token = ?", [token]);
            if (rows.length === 0) {
                return null;
            }
            return decodedToken.userId;
        } catch (error) {
            return null;
        }
    }

    static async getAllUsers(): Promise<IUser[]> {
        const sql = "SELECT id, username FROM user";
        try {
            const data = await sqlTool.execute(sql, []);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default User;
