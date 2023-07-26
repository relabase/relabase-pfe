import { NextFunction, Request, Response } from 'express';
import { LogModel } from '@models/logs.model';

const { formatDate } = require('../public/js/utilities/date-utils.js');

export class HomeController {
  public getHomePage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let logs = LogModel;

      logs = logs.filter((log) => log.type === 'created script');

      // TODO: filter the logs for just the currently signed in user
      logs = logs.filter((log) => log.id_user === 6);
      
      res.render('home', {logs, formatDate});
    } catch (error) {
      next(error);
    }
  };
}
