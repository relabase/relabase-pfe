import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User_request } from '@interfaces/user_requests.interface';
import { User_requestService } from '@services/user_requests.service';
import { OkPacket } from 'mysql2';
import { Status } from '@/interfaces/status.interface';
import { StatusService } from '@/services/status.service';

export class User_requestController {
  public user_request = Container.get(User_requestService);
  public status = Container.get(StatusService);

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
      user_requestData.id_status = 1;
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
        return;
      }

      const statusData:Status = await this.status.findStatusById(User_requestData.id_status);

      if (statusData.name_status === "approved")
      {

        res.status(409).json({ data: "already approved", message: 'approve' });
        return;
      }

      const approved:Status = await this.status.findStatusByName("approved");

      if(approved === undefined)
      {
        res.status(409).json({ data: "can't find status id for approved", message: 'approve' });
        return;
      }

      const updateUser_requestData: OkPacket = await this.user_request.updateUser_request_status(user_requestId,approved.id);

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
        return;
      }

      const statusData:Status = await this.status.findStatusById(User_requestData.id_status);
      if (statusData.name_status === "rejected")
      {

        res.status(409).json({ data: "already rejected", message: 'reject' });
        return;
      }

      const reject:Status = await this.status.findStatusByName("rejected");

      if(reject === undefined)
      {
        res.status(409).json({ data: "can't find status id for rejected", message: 'reject' });
        return;
      }

      const updateUser_requestData: OkPacket = await this.user_request.updateUser_request_status(user_requestId,reject.id);



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
