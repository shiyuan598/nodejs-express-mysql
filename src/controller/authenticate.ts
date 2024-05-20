import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth.controller';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    console.info('authHeader:', token, req.headers);
    if (!token) {
        return res.status(401).json({ code: 1, msg: '未授权：token 无效' });
    }

    try {
        const userId = await verifyToken(token);
        if (userId === null) {
            return res.status(401).json({ code: 1, msg: '未授权：token 无效或过期' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ code: 1, msg: '未授权：token 验证失败' });
    }
};