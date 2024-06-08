import { ApiResponse } from '@elsa-test/common/src';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../service/auth-service';

export const authMiddleware = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ success: false, error: 'Unauthorized: Missing token' });
        return;
    }

    try {
        const decodedToken = verifyToken(token);
        res.locals.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
    }
};
