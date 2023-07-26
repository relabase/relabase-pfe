import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Status } from '@models/status';
import { StatusService } from '@services/status.service';
import { DeleteResult } from 'typeorm';

export class StatusController {
  public status = Container.get(StatusService);

  public getStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllStatusData: Status[] = await this.status.findAllStatus();

      res.status(200).json({ data: findAllStatusData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStatusById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statusId = Number(req.params.id);
      const findOneStatusData: Status = await this.status.findStatusById(statusId);
      if(findOneStatusData === null)
      {

        res.status(409).json({ data: "Status doesn't exist", message: 'findOne' });
        return;
      }


      res.status(200).json({ data: findOneStatusData, message: 'findOne' });

    } catch (error) {
      next(error);
    }
  };

  public createStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statusData: Status = req.body;
      const createStatusData: Status = await this.status.createStatus(statusData);

      res.status(201).json({ data: createStatusData, message: 'created' });



    } catch (error) {
      next(error);
    }
  };

  public updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statusId = Number(req.params.id);
      const statusData: Status = req.body;

      statusData.id = statusId;

      const updateStatusData: Status = await this.status.updateStatus(statusData);

      if(updateStatusData === undefined)
      {
        res.status(409).json({ data: "Status doesn't exist", message: 'findOne' });
      }

      res.status(200).json({ data: updateStatusData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statusId = Number(req.params.id);
      const deleteStatusData: DeleteResult = await this.status.deleteStatus(statusId);
      if(deleteStatusData === null)
      {

        res.status(409).json({ data: "Status doesn't exist", message: 'findOne' });
        return;
      }

      res.status(200).json({ data: deleteStatusData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
