import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/models/user';

export const AdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const user: User = req.user;
    if (user.role.name_role.toLowerCase() === "admin") {
        next();
    } else {
        res.render('403');
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
