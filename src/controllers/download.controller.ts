import { NextFunction, Request, Response } from 'express';
import path from 'path';

export class DownloadController {
  public getFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let filename: string = String(req.params.filename);
      let filepath: string = '';
      if (req.params.type == 'output') {
        filepath = path.join(__dirname, '../output/' + filename);
      } else {
        filepath = path.join(__dirname, '../input/' + filename);
      }
      res.sendFile(filepath, { 
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `attachment; filename=${filename}`
        }
      }, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading file');
        }
      });
    } catch (error) {
      next(error);
    }
  };

  public getImageFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let filename: string = String(req.params.filename);
      let filepath: string = path.join(__dirname, '../files/user_applications/' + filename);
      res.sendFile(filepath);
    } catch (error) {
      next(error);
    }
  };
}
