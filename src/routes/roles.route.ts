import { Router } from 'express';
import { RoleController } from '@controllers/roles.controller';
import { CreateRoleDto, UpdateRoleDto } from '@dtos/roles.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class RoleRoute implements Routes {
  public path = '/roles';
  public router = Router();
  public role = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.role.getRoles);
    this.router.get(`${this.path}/:id(\\d+)`, this.role.getRoleById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRoleDto), this.role.createRole);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateRoleDto), this.role.updateRole);
    this.router.delete(`${this.path}/:id(\\d+)`, this.role.deleteRole);
  }
}
