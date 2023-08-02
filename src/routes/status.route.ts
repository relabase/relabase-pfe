import { Router } from 'express';
import { StatusController } from '@controllers/status.controller';
import { CreateStatusDto, UpdateStatusDto } from '@dtos/status.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class StatusRoute implements Routes {
  public path = '/status';
  public router = Router();
  public status = new StatusController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [AuthMiddleware(), AdminMiddleware], this.status.getStatus);
    this.router.get(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.status.getStatusById);
    this.router.post(`${this.path}`, [AuthMiddleware(), AdminMiddleware, ValidationMiddleware(CreateStatusDto)], this.status.createStatus);
    this.router.put(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware, ValidationMiddleware(UpdateStatusDto)], this.status.updateStatus);
    this.router.delete(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.status.deleteStatus);
  }
}
