import { Router } from 'express';
import { User_requestController } from '@controllers/user_requests.controller';
import { CreateUser_requestDto, UpdateUser_requestDto } from '@dtos/user_requests.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class User_requestRoute implements Routes {
  public path = '/user_requests';
  public router = Router();
  public user_request = new User_requestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user_request.getUser_requests);
    this.router.get(`${this.path}/:id(\\d+)`, this.user_request.getUser_requestById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUser_requestDto), this.user_request.createUser_request);
    //this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUser_requestDto), this.user_request.updateUser_request);
    this.router.delete(`${this.path}/:id(\\d+)`, this.user_request.deleteUser_request);
  }
}
