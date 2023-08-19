import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Log } from '@/models/log';
import { LogService } from '@/services/logs.service';
import { User } from '@/models/user';
import { DeleteResult } from 'typeorm';
import { CreateLogDto } from '@/dtos/logs.dto';
import { Type } from '@/models/type';

export class LogController {
  public log = Container.get(LogService);

  public getLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllLogsData: Log[] = await this.log.findAllLog();

      res.status(200).json({ data: findAllLogsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLogById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const logId = Number(req.params.id);
      const findOneLogData: Log = await this.log.findLogById(logId);

      res.status(200).json({ data: findOneLogData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const logData: Log = req.body;
      const dto: CreateLogDto = req.body;


      logData.user = new User();
      logData.user.id = dto.id_user;
      logData.type = new Type();
      logData.type.id = dto.id_type;

      const createLogData: Log = await this.log.createLog(logData);

      res.status(201).json({ data: createLogData, message: 'created' });

    } catch (error) {
      next(error);
    }
  };

  public deleteLog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const logId = Number(req.params.id);
      const deleteLogData: DeleteResult = await this.log.deleteLog(logId);

      if(deleteLogData.affected === 0)
      {
        res.status(409).json({ data: "Log doesn't exist", message: 'findOne' });
        return;
      }

      res.status(200).json({ data: deleteLogData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

}
