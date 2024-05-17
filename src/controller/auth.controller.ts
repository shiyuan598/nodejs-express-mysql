import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sqlTool from "../utils/sqlTool";

const SECRET_KEY = "your_secret_key"; // 你应该使用环境变量来存储密钥

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

        // 使用bcrypt.compareSync()比较密码
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error("密码错误");
        }

        // 生成Token
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "8h" });

        // 将Token存储到数据库中
        await saveTokenToDB(token, user.id);

        fullFilled(response, { token });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const createUser = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    console.info(username, password);
    // 生成盐值
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    // 生成哈希密码
    const hashedPassword = bcrypt.hashSync(password, salt);

    const sql = "INSERT INTO user (username, password) VALUES (?, ?)";
    try {
        await sqlTool.execute(sql, [username, hashedPassword]);
        fullFilled(response, { message: "用户创建成功" });
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
        // 验证Token的合法性
        const decodedToken: any = jwt.verify(token, SECRET_KEY);

        // 检查Token是否存在于数据库中
        const [rows] = await sqlTool.execute("SELECT * FROM token WHERE token = ?", [token]);
        if (rows.length === 0) {
            return null; // Token不存在
        }

        // 返回用户ID
        return decodedToken.userId;
    } catch (error) {
        return null; // Token无效或过期
    }
};
