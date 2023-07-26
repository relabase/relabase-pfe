import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Role } from '@models/role';
import { RoleService } from '@services/roles.service';
import { DeleteResult } from 'typeorm';

export class RoleController {
  public role = Container.get(RoleService);

  public getRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRolesData: Role[] = await this.role.findAllRole();

      res.status(200).json({ data: findAllRolesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleId = Number(req.params.id);
      const findOneRoleData: Role = await this.role.findRoleById(roleId);
      if(findOneRoleData === undefined)
      {

        res.status(409).json({ data: "Role doesn't exist", message: 'findOne' });
      }


      res.status(200).json({ data: findOneRoleData, message: 'findOne' });




    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleData: Role = req.body;
      const createRoleData: Role = await this.role.createRole(roleData);

      res.status(201).json({ data: createRoleData, message: 'created' });



    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleId = Number(req.params.id);
      const roleData: Role = req.body;
      roleData.id = roleId;
      const updateRoleData: Role = await this.role.updateRole(roleData);

      if(updateRoleData === undefined)
      {
        res.status(409).json({ data: "Role doesn't exist", message: 'findOne' });
      }

      res.status(200).json({ data: updateRoleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roleId = Number(req.params.id);
      const deleteRoleData: DeleteResult = await this.role.deleteRole(roleId);
      if(deleteRoleData.affected === 0)
      {

        res.status(409).json({ data: "Role doesn't exist", message: 'findOne' });
        return;
      }

      res.status(200).json({ data: deleteRoleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
