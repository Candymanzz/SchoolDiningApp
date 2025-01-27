import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from './CustomRequest';

export default function (req: CustomRequest, res: Response, next: NextFunction): void {
    if (req.method === 'OPTIONS') {
        next();
        return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        req.employee = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Incorrect token' });
    }
}
