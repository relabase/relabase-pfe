import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@models/user';
import { UserService } from '@services/users.service';
import { RoleService } from '@/services/roles.service';
import { Role } from '@/models/role';
import { DeleteResult } from 'typeorm';

export class UserController {
  public user = Container.get(UserService);
  public role = Container.get(RoleService);

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.user.findUserById(userId);
      if(findOneUserData === undefined)
      {

        res.status(409).json({ data: "User doesn't exist", message: 'findOne' });
      }


      res.status(200).json({ data: findOneUserData, message: 'findOne' });




    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;


      if(userData.role === undefined)
      {
        const defaultRole:Role = await this.role.findRoleByName("user");
        userData.role = defaultRole;
      }


      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: User = req.body;
      userData.id = userId;
      const updateUserData: User = await this.user.updateUser(userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: DeleteResult = await this.user.deleteUser(userId);
      if(deleteUserData.affected === 0)
      {

        res.status(409).json({ data: "User doesn't exist", message: 'findOne' });
        return;
      }

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
