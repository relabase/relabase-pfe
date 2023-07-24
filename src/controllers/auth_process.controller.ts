import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

export class AuthProcessController {

    public redirect = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        const user: User = req.user;
        if (user == null) {
            console.log('is null');
            res.status(200).json({ redirectUrl: 'register' });
        } else {
            console.log('is not null');
            res.status(200).json({ redirectUrl: 'home' });
        }
    }
}
