import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Log } from '@/interfaces/logs.interface';
import { LogService } from '@/services/logs.service';
import { OkPacket } from 'mysql2';

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
      const createLogData: OkPacket = await this.log.createLog(logData.file_path_input,logData.file_path_result,logData.id_user,logData.text);

      res.status(201).json({ data: "createLogData", message: 'created' });

    } catch (error) {
      next(error);
    }
  };

  public deleteLog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const logId = Number(req.params.id);
      const deleteLogData: Log = await this.log.deleteLog(logId);

      res.status(200).json({ data: deleteLogData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  
}
