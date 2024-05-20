import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/auth.model";

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
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            throw new Error("用户不存在");
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error("密码错误");
        }
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "8h" });
        user.id && await User.saveTokenToDB(token, user.id);
        fullFilled(response, { id: user.id, username, token });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const getUsers = async (request: Request, response: Response) => {
    try {
        const users = await User.getAllUsers();
        fullFilled(response, users);
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const createUser = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    try {
        await User.create({ username, password });
        fullFilled(response, { message: "用户创建成功" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const resetPassword = async (request: Request, response: Response) => {
    const { username, currentPassword, newPassword } = request.body;
    try {
        await User.updatePassword(username, newPassword, currentPassword);
        fullFilled(response, { message: "密码修改成功" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const deleteUser = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    try {
        await User.delete(id);
        fullFilled(response, { message: "用户删除成功" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const forgetPassword = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    try {
        await User.updatePassword(username, password, password); // No need for current password here
        fullFilled(response, { message: "密码修改成功" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const logout = async (request: Request, response: Response) => {
    const { token } = request.body;
    try {
        await User.deleteTokenFromDB(token);
        fullFilled(response, { message: "退出登录" });
    } catch (error) {
        errorHandler(response, error as Error);
    }
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ code: 1, msg: '未授权：token 无效' });
    }
    try {
        const userId = await User.verifyToken(token);
        if (userId === null) {
            return res.status(401).json({ code: 1, msg: '未授权：token 无效或过期' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ code: 1, msg: '未授权：token 验证失败' });
    }
};
