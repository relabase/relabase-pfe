import { exec } from 'child_process';
import { NextFunction, Request, Response } from 'express';

export class IndexController {
  public getHomepage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      exec('Rscript -e "print(123)"', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing R script: ${error}`);
          return;
        }
        console.log(`R script output: ${stdout}`);
        // res.status(200).json({ data: updateUserData, message: 'sent' });
      });
      res.sendFile('index.html', { root: './src/views' });
    } catch (error) {
      next(error);
    }
  };

  public sendScript = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const script = String(req.params.script);
      exec('Rscript -e "print(123)"', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing R script: ${error}`);
          return;
        }
        console.log(`R script output: ${stdout}`);
        // res.status(200).json({ data: updateUserData, message: 'sent' });
      });
    } catch (error) {
      next(error);
    }
  };
}
