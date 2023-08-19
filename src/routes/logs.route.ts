import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { LogController } from '@/controllers/logs.controller';
import { CreateLogDto,UpdateLogDto } from '@dtos/logs.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class LogRoute implements Routes {
  public path = '/logs';
  public router = Router();
  public log = new LogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(), this.log.getLogs);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware(), this.log.getLogById);
    this.router.post(`${this.path}`,ValidationMiddleware(CreateLogDto),this.log.createLog);
    this.router.delete(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.log.deleteLog);
  }
}
