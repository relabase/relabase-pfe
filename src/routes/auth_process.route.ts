import { Router } from 'express';
import { AuthProcessController } from '@controllers/auth_process.controller';
import { AuthProcessMiddleware } from '@/middlewares/authprocess.middleware';
import { Routes } from '@interfaces/routes.interface';

export class AuthProcessRoute implements Routes {
    public path = '/authprocess';
    public router = Router();
    public authprocess = new AuthProcessController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
        this.router.post(`${this.path}`, AuthProcessMiddleware, this.authprocess.redirect);
    }
  }
  