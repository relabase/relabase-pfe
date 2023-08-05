import { Router } from 'express';
import { Package_requestController } from '@controllers/package_requests.controller';
import { CreatePackage_requestDto, UpdatePackage_requestDto } from '@dtos/package_requests.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class Package_requestRoute implements Routes {
  public path = '/package_requests';
  public router = Router();
  public package_request = new Package_requestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [AuthMiddleware(), AdminMiddleware], this.package_request.getPackage_requests);
    this.router.get(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.package_request.getPackage_requestById);
    this.router.post(`${this.path}`, [AuthMiddleware(), AdminMiddleware, ValidationMiddleware(CreatePackage_requestDto)], this.package_request.createPackage_request);
    this.router.put(`${this.path}/approve/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.package_request.approvePackage_request);
    this.router.put(`${this.path}/reject/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.package_request.rejectPackageRequest);
    this.router.delete(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.package_request.deletePackage_request);
  }
}
