import { Router } from 'express';
import { RoleController } from '@controllers/roles.controller';
import { CreateRoleDto, UpdateRoleDto } from '@dtos/roles.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class RoleRoute implements Routes {
  public path = '/roles';
  public router = Router();
  public role = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  //TODO: add AdminMiddleware
  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(), this.role.getRoles);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware(), this.role.getRoleById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRoleDto), this.role.createRole);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware(), ValidationMiddleware(UpdateRoleDto), this.role.updateRole);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware(), this.role.deleteRole);
  }
}
