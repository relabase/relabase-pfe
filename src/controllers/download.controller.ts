import { NextFunction, Request, Response } from 'express';
import path from 'path';

export class DownloadController {
  public getFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let filename: string = String(req.params.filename); //replace filename by id in db
      let filepath: string = path.join(__dirname, '../output/' + filename + '.html');
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
}