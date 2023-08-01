import { Router } from 'express';
import { HelpController } from '@controllers/help.controller';
import { Routes } from '@interfaces/routes.interface';

export class HelpRoute implements Routes {
  public router = Router();
  public help = new HelpController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/help', this.help.getHelpPage);
  }
}
