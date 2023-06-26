import { exec } from 'child_process';
import { NextFunction, Request, Response } from 'express';

export class IndexController {
  public getHomepage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.sendFile('index.html', { root: './src/views' });
    } catch (error) {
      next(error);
    }
  };

  public sendScript = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const script = String(req.body.script);
      exec('Rscript -e ' + '"' + script + '" > src/output/output.txt', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing R script: ${error}`);
          return;
        }
        //console.log(`R script output: ${stdout}`);
        res.status(200).json({ data: stdout, message: 'sent' });
      });
    } catch (error) {
      next(error);
    }
  };
}
