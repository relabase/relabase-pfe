import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Type } from '@models/type';
import { TypeService } from '@services/type.service';
import { DeleteResult } from 'typeorm';

export class TypeController {
  public type = Container.get(TypeService);

  public getType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllTypeData: Type[] = await this.type.findAllType();

      res.status(200).json({ data: findAllTypeData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId = Number(req.params.id);
      const findOneTypeData: Type = await this.type.findTypeById(typeId);
      if(findOneTypeData === null)
      {

        res.status(409).json({ data: "Type doesn't exist", message: 'findOne' });
        return;
      }


      res.status(200).json({ data: findOneTypeData, message: 'findOne' });

    } catch (error) {
      next(error);
    }
  };

  public createType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeData: Type = req.body;
      const createTypeData: Type = await this.type.createType(typeData);

      res.status(201).json({ data: createTypeData, message: 'created' });



    } catch (error) {
      next(error);
    }
  };

  public updateType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId = Number(req.params.id);
      const typeData: Type = req.body;

      typeData.id = typeId;

      const updateTypeData: Type = await this.type.updateType(typeData);

      if(updateTypeData === undefined)
      {
        res.status(409).json({ data: "Type doesn't exist", message: 'findOne' });
      }

      res.status(200).json({ data: updateTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId = Number(req.params.id);
      const deleteTypeData: DeleteResult = await this.type.deleteType(typeId);
      if(deleteTypeData === null)
      {

        res.status(409).json({ data: "Type doesn't exist", message: 'findOne' });
        return;
      }

      res.status(200).json({ data: deleteTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
