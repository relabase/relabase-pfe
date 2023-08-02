import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/models/user';

export const AdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const user: User = req.user;
    if (user.role.name_role === "admin") {
        next();
    } else {
        res.redirect('/login');
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
