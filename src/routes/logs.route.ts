import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { LogController } from '@/controllers/logs.controller';
import { CreateLogDto,UpdateLogDto } from '@dtos/logs.dto';

export class LogRoute implements Routes {
  public path = '/logs';
  public router = Router();
  public log = new LogController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.log.getLogs);
    this.router.get(`${this.path}/:id(\\d+)`, this.log.getLogById);
    this.router.post(`${this.path}`,ValidationMiddleware(CreateLogDto),this.log.createLog);
    this.router.delete(`${this.path}/:id(\\d+)`, this.log.deleteLog);
    /*
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto), this.user.updateUser);

    */

  }
}
