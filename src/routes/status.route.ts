import { Router } from 'express';
import { StatusController } from '@controllers/status.controller';
import { CreateStatusDto, UpdateStatusDto } from '@dtos/status.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class StatusRoute implements Routes {
  public path = '/status';
  public router = Router();
  public status = new StatusController();

  constructor() {
    this.initializeRoutes();
  }

  //TODO: add AdminMiddleware
  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(), this.status.getStatus);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware(), this.status.getStatusById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateStatusDto), this.status.createStatus);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateStatusDto), this.status.updateStatus);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware(), this.status.deleteStatus);
  }
}
