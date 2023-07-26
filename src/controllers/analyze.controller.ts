import { LogService } from '@/services/logs.service';
import { exec } from 'child_process';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import fs from 'fs';
import { User } from '@/models/user';



export class AnalyzeController {
  public log = Container.get(LogService);

  public getView = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('analyze');
    } catch (error) {
      next(error);
    }
  };

  public sendScript = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const analyze_rscript_path = 'src/resources/analyze_rscript.R';
      const analyze_rscript = fs.readFileSync(analyze_rscript_path, 'utf8');
      const analyze_user_script = analyze_rscript.replace('##USER_SCRIPT_INJECTED##', String(req.body.script)).
      replace('##CSV_DATA##', "data <- read.csv('../test/WalkTheDogs.csv')\n");

      let filename: string = this.getTimestamp();
      this.generateRFileFromString(String(req.body.script), filename, next);
      let command: string = `Rscript -e "library(rmarkdown); rmarkdown::render(\'src/input/${filename}.Rmd\', output_format = \'html_document\', output_file = \'../output/${filename}.htm\')"`;
      exec(command, (error, stdout, stderr) => {
        const currentUser:User = new User();
        currentUser.id = 1;
        if (error) {
          console.error(`Error executing R script: ${error}`);
          //TODO switch id user to current user id
          this.log.createLog(`src/input/${filename}.Rmd`,``,currentUser, `Error executing R script: ${error}`).catch((rej) =>
          {
            console.log(rej);
          });
          return;
        }
        else
        {
          //TODO switch id user to current user id
          this.log.createLog(`src/input/${filename}.Rmd`,`../output/${filename}.htm`,currentUser, `Success`).catch((rej) =>
          {
            console.log(rej);
          });
        }
        fs.readFile('src/output/' + filename + '.htm', 'utf8', (err, data) => {
          if (error) {
            console.error(`Error reading .htm file: ${error}`);

            return;
          }
          res.status(200).json({ data: data, filename: filename, message: 'sent' });
        });
      });
    } catch (error) {
      next(error);
    }
  };

  private generateRFileFromString = async (script: string, filename: string, next: NextFunction): Promise<void> => {
    try {
      //TODO: add date and author's name
      let prepend: string = '```{r}\n';
      fs.writeFileSync(`src/input/${filename}.Rmd`, prepend + script);
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
