import { Router } from 'express';
import { User_requestController } from '@controllers/user_requests.controller';
import { CreateUser_requestDto, UpdateUser_requestDto } from '@dtos/user_requests.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import multer from 'multer';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class User_requestRoute implements Routes {
  public path = '/user_requests';
  public router = Router();
  public user_request = new User_requestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const upload = this.initializeMulter();
    this.router.get(`${this.path}`, [AuthMiddleware(), AdminMiddleware], this.user_request.getUser_requests);
    this.router.get(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.user_request.getUser_requestById);
    this.router.post(`${this.path}`, [AuthMiddleware('register'), upload.single('image'), ValidationMiddleware(CreateUser_requestDto)], this.user_request.createUser_request);
    this.router.put(`${this.path}/reject/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.user_request.rejectUser_request);
    this.router.delete(`${this.path}/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.user_request.deleteUser_request);
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
