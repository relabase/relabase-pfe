import { NextFunction, Request, Response } from 'express';
import { LogModel } from '@models/logs.model';
import { RequestWithUser } from '@/interfaces/auth.interface';

const { formatDate } = require('../public/js/utilities/date-utils.js');

export class HomeController {
  public getHomePage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      let logs = LogModel;

      logs = logs.filter((log) => log.type === 'created script');

      // TODO: filter the logs for just the currently signed in user
      logs = logs.filter((log) => log.id_user === 6);
      
      res.render('home', { logs, formatDate, currentUser: `${req.user.first_name} ${req.user.last_name}`, isAdmin: req.user.role.id == 1 });
    } catch (error) {
      next(error);
    }
  };
}
