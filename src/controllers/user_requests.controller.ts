import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User_request } from '@models/user_request';
import { User_requestService } from '@services/user_requests.service';
import { OkPacket } from 'mysql2';
import { Status } from '@/models/status';
import { StatusService } from '@/services/status.service';
import { Package_request } from '@/models/package_request';
import { DeleteResult } from 'typeorm';
import { RequestWithUser } from '@/interfaces/auth.interface';

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
      if(findOneUser_requestData === null)
      {

        res.status(409).json({ data: "User_request doesn't exist", message: 'findOne' });
        return;
      }


      res.status(200).json({ data: findOneUser_requestData, message: 'findOne' });




    } catch (error) {
      next(error);
    }
  };

  public createUser_request = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      let token: string = req.token_payload?.sub;
      const userRequest: User_request = await this.user_request.findUser_requestByGoogleId(token);
      let message: string;

      // if user request for google id exists
      if (userRequest) {
        switch (userRequest.status.name_status) {
          case "in progress":
            message = "The account you are trying to register already has a pending application. Please wait for the application to be processed.";
            break;
          case "approved":
            message = "The account you are trying to register already exists and has been approved. Please log in using your existing credentials.";
            break;
          case "rejected":
            message = "The account you are trying to register was previously submitted and rejected.";
            break;
          default:
            message = "The account you are trying to register is currently in an unknown status. Please contact support for further assistance.";
            break;
        }
        res.status(409).json({ success: false, message });
        return;
      }
      req.body.google_id = token;
      req.body.image = req.file.filename;
      const user_requestData: User_request = req.body;
      const defaultStatus:Status = await this.status.findStatusByName("in progress");

      if(defaultStatus === null)
      {
        res.status(409).json({ data: "Status 'in progress' doesn't exist", message: 'created' });
        return;
      }

      user_requestData.status = defaultStatus;

      const createUser_requestData: User_request = await this.user_request.createUser_request(user_requestData);

      res.status(201).json({ data: createUser_requestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public approveUser_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_requestId = Number(req.params.id);
      const User_requestData: User_request = await this.user_request.findUser_requestById(user_requestId);

      if(User_requestData === null)
      {
        res.status(409).json({ data: "User_request doesn't exist", message: 'approve' });
        return;
      }

      const statusData:Status = await this.status.findStatusById(User_requestData.status.id);

      if (statusData.name_status === "approved")
      {

        res.status(409).json({ data: "already approved", message: 'approve' });
        return;
      }

      const approved:Status = await this.status.findStatusByName("approved");

      if(approved === null)
      {
        res.status(409).json({ data: "can't find status id for approved", message: 'approve' });
        return;
      }

      User_requestData.status = approved;

      const updateUser_requestData: User_request = await this.user_request.updateUser_request_status(User_requestData);

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

      const statusData:Status = await this.status.findStatusById(User_requestData.status.id);
      if (statusData.name_status === "rejected")
      {

        res.status(409).json({ data: "already rejected", message: 'reject' });
        return;
      }

      const reject:Status = await this.status.findStatusByName("rejected");

      if(reject === null)
      {
        res.status(409).json({ data: "can't find status id for rejected", message: 'reject' });
        return;
      }

      User_requestData.status = reject;

      const updateUser_requestData: User_request = await this.user_request.updateUser_request_status(User_requestData);



      res.status(200).json({ data: updateUser_requestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public deleteUser_request = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_requestId = Number(req.params.id);
      const deleteUser_requestData: DeleteResult = await this.user_request.deleteUser_request(user_requestId);
      if(deleteUser_requestData === null)
      {

        res.status(409).json({ data: "User_request doesn't exist", message: 'delete' });
        return;
      }

      res.status(200).json({ data: deleteUser_requestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
