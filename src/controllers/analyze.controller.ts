import { exec } from 'child_process';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

export class AnalyzeController {
  public getView = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.sendFile('analyze.html', { root: './src/views' });
    } catch (error) {
      next(error);
    }
  };

  public sendScript = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_script = String(req.body.script);
      const inject_csv_data = 'data = read.csv("src/test/WalkTheDogs.csv")\n';
      const modded_script = inject_csv_data + user_script;
      console.log(modded_script);

      this.generateRFileFromString(modded_script, next);

      const command = 'Rscript -e "source(\'src/input/input.R\')" > src/output/output.txt';
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing R script: ${error}`);
          return;
        }
        console.log(stdout);
        res.status(200).json({ data: stdout, message: 'sent' });
      });
    } catch (error) {
      next(error);
    }
  };

  private generateRFileFromString = async (script: string, next: NextFunction): Promise<void> => {
    try {
      fs.writeFileSync('src/input/input.R', script);
    } catch (error) {
      next(error);
    }
  };
}

