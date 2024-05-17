import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth.controller';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const user = await verifyToken(token);
        if (user) {
            next();
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};
