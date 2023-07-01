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
      let filename: string = this.getTimestamp();
      this.generateRFileFromString(String(req.body.script), filename, next);
      let command: string = `Rscript -e "library(rmarkdown); rmarkdown::render(\'src/input/${filename}.Rmd\', output_format = \'html_document\', output_file = \'../output/${filename}.html\')"`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing R script: ${error}`);
          return;
        }
        //if - parse output file to check for errors/if the file is empty
        // console.log(stdout);
        res.status(200).json({ data: stdout, message: 'sent' });
      });
    } catch (error) {
      next(error);
    }
  };

  private generateRFileFromString = async (script: string, filename: string, next: NextFunction): Promise<void> => {
    try {
      fs.writeFileSync(`src/input/${filename}.Rmd`, script);
    } catch (error) {
      next(error);
    }
  };

  private getTimestamp(): string {
    const now = new Date();

    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timestamp = year + month + day + hours + minutes + seconds;

    return timestamp;
  }
}

