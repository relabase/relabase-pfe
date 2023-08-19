import { NextFunction, Request, Response } from 'express';

import { UserModel } from '@models/users.model';
import { LogModel } from '@models/logs.model';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { Log } from '@/models/log';
import { LogService } from '@/services/logs.service';
import { Container } from 'typedi';
import { TypeService } from '@/services/type.service';
import { Type } from '@/models/type';

const { formatDate } = require('../public/js/utilities/date-utils.js');

export class HistoryController {
  public log = Container.get(LogService);
  public type = Container.get(TypeService);
  
  public getHistoryPage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      //only return scripts that were ran successfully
      const logs: Log[] = await this.log.findAllLogByType(this.type.SUCCESS);

      res.render('history', { logs, formatDate, currentUser: `${req.user.first_name} ${req.user.last_name}`, isAdmin: req.user.role.id == 1 });
    } catch (error) {
      next(error);
    }
  };
}
