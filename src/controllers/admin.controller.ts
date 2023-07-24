import { NextFunction, Request, Response } from 'express';

import { UserRequestsModel } from '@models/user_requests.model';
import { PackageRequestModel } from '@/models/package_requests.model';
import { UserModel } from '@models/users.model';

export class AdminController {
  public getAdminPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //TODO: replace with actual fetched data
      let userRequests = UserRequestsModel;
      let packageRequests = PackageRequestModel;
      let users = UserModel;

      res.render('admin', { userRequests, packageRequests, users });
    } catch (error) {
      next(error);
    }
  };
}
