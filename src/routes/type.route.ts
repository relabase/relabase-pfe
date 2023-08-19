import { Router } from 'express';
import { TypeController } from '@controllers/type.controller';
import { CreateTypeDto, UpdateTypeDto } from '@dtos/type.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class TypeRoute implements Routes {
  public path = '/type';
  public router = Router();
  public type = new TypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [AuthMiddleware(), AdminMiddleware], this.type.getType);
    this.router.get(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.type.getTypeById);
    this.router.post(`${this.path}`, [AuthMiddleware(), AdminMiddleware, ValidationMiddleware(CreateTypeDto)], this.type.createType);
    this.router.put(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware, ValidationMiddleware(UpdateTypeDto)], this.type.updateType);
    this.router.delete(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.type.deleteType);
  }
}
