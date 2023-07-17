import { Router } from 'express';
import { DownloadController } from '@controllers/download.controller';
import { Routes } from '@interfaces/routes.interface';

export class DownloadRoute implements Routes {
  public path = '/download';
  public router = Router();
  public download = new DownloadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:filename`, this.download.getFile); //TODO: add auth middleware
  }
}
