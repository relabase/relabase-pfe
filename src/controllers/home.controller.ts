import { NextFunction, Request, Response } from 'express';
import { LogModel } from '@models/logs.model';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { LogService } from '@/services/logs.service';

const { formatDate } = require('../public/js/utilities/date-utils.js');

export class HomeController {
  public getHomePage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('home', { logs: req.user.logs, formatDate, currentUser: `${req.user.first_name} ${req.user.last_name}`, isAdmin: req.user.role.id == 1 });
    } catch (error) {
      next(error);
    }
  };
}
