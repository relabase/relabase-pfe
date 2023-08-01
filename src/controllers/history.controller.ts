import { NextFunction, Request, Response } from 'express';

import { UserModel } from '@models/users.model';
import { LogModel } from '@models/logs.model';

const { formatDate } = require('../public/js/utilities/date-utils.js');

export class HistoryController {
  public getHistoryPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = UserModel;
      let logs = LogModel;

      logs = logs.filter((log) => log.type === 'created script');

      logs.forEach((log) => {
        const logUser = users.find((user) => user.id === log.id_user);
        if (logUser) {
          log.userFullName = `${logUser.first_name} ${logUser.last_name}`;
        }
      });

      res.render('history', { users, logs, formatDate });
    } catch (error) {
      next(error);
    }
  };
}
