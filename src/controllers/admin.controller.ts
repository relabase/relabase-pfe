import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User_requestService } from '@/services/user_requests.service';
import { Package_requestService } from '@/services/package_requests.service';
import { UserService } from '@/services/users.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User_requestController } from './user_requests.controller';
import { User_request } from '@/models/user_request';
import { UserController } from './users.controller';
import { User } from '@/models/user';

const userService = Container.get(UserService);
const packageRequestService = Container.get(Package_requestService);
const userRequestService = Container.get(User_requestService);
const userRequestController = new User_requestController();

export class AdminController {
  public getAdminPage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      let userRequests = await userRequestService.findAllUser_requestByStatus(1);
      let packageRequests = await packageRequestService.findAllPackage_requestByStatus(1);
      let users = await userService.findAllUser();

      res.render('admin', { userRequests, packageRequests, users, currentUser: `${req.user.first_name} ${req.user.last_name}`, isAdmin: req.user.role.id == 1 });
    } catch (error) {
      next(error);
    }
  };

  public approveUserApplicationAndCreateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      //update the user request row in table
      let request: User_request = await userRequestController.approveUser_request(req, res, next);
      req.body = request;
      //create a new user
      const userController = new UserController();
      
      let user: User = await userController.createUser(req, res, next);
      res.status(200).json({success:true, data:user, message:'User successfully created!'});
    } catch (error) {
      next(error);
    }
  };
}
