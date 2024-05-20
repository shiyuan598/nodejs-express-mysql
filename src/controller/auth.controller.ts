import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sqlTool from "../utils/sqlTool";

const SECRET_KEY = "q;lgjiqmqq";

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

export const login = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    const sql = "SELECT * FROM user WHERE username = ?";
    try {
        const data = await sqlTool.execute(sql, [username]);
        const user = data[0];
        if (!user) {
            throw new Error("用户不存在");
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error("密码错误");
        }
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "8h" });
        await saveTokenToDB(token, user.id);
        fullFilled(response, { id: user.id, username, token });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const getUsers = async (request: Request, response: Response) => {
    const sql = "SELECT id, username FROM user";
    try {
        const data = await sqlTool.execute(sql, []);
        fullFilled(response, data);
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const createUser = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
    try {
        await sqlTool.execute(sql, [username, hashedPassword]);
        fullFilled(response, { message: "用户创建成功" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const resetPassword = async (request: Request, response: Response) => {
    const { username, currentPassword, newPassword } = request.body;

    const sql = "SELECT * FROM user WHERE username = ?";
    try {
        const data = await sqlTool.execute(sql, [username]);
        const user = data[0];
        if (!user) {
            throw new Error("用户不存在");
        }
        if (!bcrypt.compareSync(currentPassword, user.password)) {
            throw new Error("当前密码错误");
        }

        const saltRounds = 10;
        const hashedNewPassword = bcrypt.hashSync(newPassword, saltRounds);

        const updateSql = "UPDATE user SET password = ? WHERE username = ?";
        await sqlTool.execute(updateSql, [hashedNewPassword, username]);

        fullFilled(response, { message: "密码修改成功" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const deleteUser = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    try {
        const sql = `DELETE FROM issue WHERE id = ?`;
        const data = await sqlTool.execute(sql, [id]);
        fullFilled(response, data);
    } catch (err) {
        errorHandler(response, err as Error);
    }
};

export const forgetPassword = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    try {
        const saltRounds = 10;
        const hashedNewPassword = bcrypt.hashSync(password, saltRounds);

        const updateSql = "UPDATE user SET password = ? WHERE username = ?";
        await sqlTool.execute(updateSql, [hashedNewPassword, username]);

        fullFilled(response, { message: "密码修改成功" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

const saveTokenToDB = async (token: string, userId: number) => {
    await sqlTool.execute("INSERT INTO token (token, user_id) VALUES (?, ?)", [token, userId]);
};

export const logout = async (request: Request, response: Response) => {
    const { token } = request.body;
    try {
        await deleteTokenFromDB(token);
        fullFilled(response, { message: "退出登录" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
    await deleteTokenFromDB(token);
};

const deleteTokenFromDB = async (token: string) => {
    await sqlTool.execute("DELETE FROM token WHERE token = ?", [token]);
};

export const verifyToken = async (token: string): Promise<number | null> => {
    try {
        const decodedToken: any = jwt.verify(token, SECRET_KEY);
        const [rows] = await sqlTool.execute("SELECT * FROM token WHERE token = ?", [token]); // and user_id = ?
        if (rows.length === 0) {
            return null;
        }
        return decodedToken.userId;
    } catch (error) {
        return null;
    }
};
