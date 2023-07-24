import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { User } from '@interfaces/users.interface';
import { UserService } from 'services/users.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

const userService = Container.get(UserService);

const verifyIdToken = async (req: Request) => {
    const ticket = await new OAuth2Client().verifyIdToken({
        idToken: String(req.body.credential),
        audience: 'clientid',
    });
    return ticket.getPayload();
};

export const AuthProcessMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const payload: TokenPayload = await verifyIdToken(req);
        //temporary, should be findUserByGoogleId
        const user: User = await userService.findUserById(Number(payload.sub));
        req.user = user === undefined ? null : user;
        console.log(payload);
        next();
    } catch (error) {
        next(new HttpException(401, 'Error happened'));
    }
};
