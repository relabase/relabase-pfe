import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [AuthMiddleware(), AdminMiddleware], this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.user.getUserById);
    this.router.post(`${this.path}`, [AuthMiddleware(), AdminMiddleware, ValidationMiddleware(CreateUserDto)], this.user.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware, ValidationMiddleware(UpdateUserDto)], this.user.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.user.deleteUser);
  }
}
