import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddlware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        const email = req.body.email;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        next();
    }
}
