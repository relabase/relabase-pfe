import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import multer from 'multer';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const upload = this.initializeMulter();
    this.router.get('/logout', this.auth.logOut);
    this.router.get('/login', AuthMiddleware('login'), this.auth.getLoginPage);
    this.router.post('/authenticate', this.auth.redirect);
    this.router.get('/authenticate/client-id', this.auth.getClientId);
    this.router.get('/register', AuthMiddleware('register'), this.auth.getRegisterPage)
    this.router.post('/register', [AuthMiddleware('register'), upload.single('file')], this.auth.submitUserApplication)
  }

  private initializeMulter = (): multer.Multer => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'src/files/user_applications/');
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `user_application_id_${Date.now()}.${ext}`);
      },
    });
    return multer({ storage });
  }
}
