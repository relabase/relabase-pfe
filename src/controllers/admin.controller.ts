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
import { Package_requestController } from './package_requests.controller';
import { Package_request } from '@/models/package_request';
import { exec } from 'child_process';

const userService = Container.get(UserService);
const packageRequestService = Container.get(Package_requestService);
const userRequestService = Container.get(User_requestService);
const userRequestController = new User_requestController();
const packageRequestController = new Package_requestController();

export class AdminController {
  public getAdminPage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      let userRequests = await userRequestService.findAllUser_requestByStatus(1);
      let packageRequests = await packageRequestService.findAllPackage_requestByStatus(1);
      let users = await userService.findAllUser();

      res.render('admin', { 
        userRequests, 
        packageRequests, 
        users, 
        currentUser: `${req.user.first_name} ${req.user.last_name}`, 
        isAdmin: req.user.role.id == 1 
      });
    } catch (error) {
      next(error);
    }
  };

  public approveUserApplicationAndCreateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      //update the user request row in table
      let request: User_request = await userRequestController.approveUser_request(req, res, next);
      if (request != null) {
        req.body = request;
        //create a new user
        const userController = new UserController();
        let user: User = await userController.createUser(req, res, next);
        res.status(200).json({ success: true, data: user, message: 'User successfully created!' });
      } else {
        res.status(500).json({ success: false, message:'An error has occurred.' });
      }
    } catch (error) {
      next(error);
    }
  };

  public approvePackageRequest = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      let request: Package_request = await packageRequestController.approvePackage_request(req, res, next);
      if (request != null) {

        let command: string = `Rscript -e "install.packages('${request.name_package}', repos = 'https://cran.rstudio.com/', lib='R_packages')"`;
        exec (command, async (error, stdout, stderr) => {
          if (error) {
            res.status(500).json({ success: false, message: 'An error has occurred while installing the package: ' + error });
            await packageRequestController.resetPackageRequest(req, res, next);
          } else {
            res.status(200).json({ success: true, data: request, message: 'The package request has been successfully approved and the package was installed.' });
          }
        });
      } else {
        res.status(500).json({ success: false, message: 'An error has occurred.' });
      }
    } catch (error) {
      next(error);
    }
  };
}
