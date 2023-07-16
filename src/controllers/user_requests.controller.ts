import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User_request } from '@interfaces/user_requests.interface';
import { User_requestService } from '@services/user_requests.service';
import { OkPacket } from 'mysql2';

export class User_requestController {
  public user_request = Container.get(User_requestService);

  public getUser_requests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUser_requestsData: User_request[] = await this.user_request.findAllUser_request();

      res.status(200).json({ data: findAllUser_requestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUser_requestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_requestId = Number(req.params.id);
      const findOneUser_requestData: User_request = await this.user_request.findUser_requestById(user_requestId);
      if(findOneUser_requestData === undefined)
      {
        
        res.status(409).json({ data: "User_request doesn't exist", message: 'findOne' });
      }
      

      res.status(200).json({ data: findOneUser_requestData, message: 'findOne' });




    } catch (error) {
      next(error);
    }
  };

  public createUser_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_requestData: User_request = req.body;
      console.log(req.body);

      

      
      const createUser_requestData: User_request = await this.user_request.createUser_request(user_requestData);

      res.status(201).json({ data: createUser_requestData, message: 'created' });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  };
  public approveUser_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_requestId = Number(req.params.id);
      const User_requestData: User_request = await this.user_request.findUser_requestById(user_requestId);

      if(User_requestData === undefined)
      {
        res.status(409).json({ data: "User_request doesn't exist", message: 'approve' });
      }
      else if (User_requestData.is_approve == true)
      {
        res.status(409).json({ data: "already approve", message: 'approve' });
      }

      const updateUser_requestData: OkPacket = await this.user_request.approveUser_request(user_requestId);



      res.status(200).json({ data: updateUser_requestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public rejectUser_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_requestId = Number(req.params.id);
      const User_requestData: User_request = await this.user_request.findUser_requestById(user_requestId);

      if(User_requestData === undefined)
      {
        res.status(409).json({ data: "User_request doesn't exist", message: 'reject' });
      }
      else if (User_requestData.is_approve == false)
      {
        res.status(409).json({ data: "already reject", message: 'reject' });
      }

      const updateUser_requestData: OkPacket = await this.user_request.rejectUser_request(user_requestId);



      res.status(200).json({ data: updateUser_requestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public deleteUser_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_requestId = Number(req.params.id);
      const deleteUser_requestData: User_request = await this.user_request.deleteUser_request(user_requestId);
      if(deleteUser_requestData === undefined)
      {
        
        res.status(409).json({ data: "User_request doesn't exist", message: 'findOne' });
      }

      res.status(200).json({ data: deleteUser_requestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
