import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User_requestService } from '@/services/user_requests.service';
import { Package_requestService } from '@/services/package_requests.service';
import { UserService } from '@/services/users.service';

const userService = Container.get(UserService);
const packageRequestService = Container.get(Package_requestService);
const userRequestService = Container.get(User_requestService);

export class AdminController {
  public getAdminPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let userRequests = await userRequestService.findAllUser_requestByStatus(1);
      let packageRequests = await packageRequestService.findAllPackage_requestByStatus(1);
      let users = await userService.findAllUser();

      res.render('admin', { userRequests, packageRequests, users });
    } catch (error) {
      next(error);
    }
  };
}
