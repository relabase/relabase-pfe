import { LogService } from '@/services/logs.service';
import { exec } from 'child_process';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import fs from 'fs';
import { User } from '@/models/user';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { Log } from '@/models/log';
import { TypeService } from '@/services/type.service';
import { Type } from '@/models/type';



export class AnalyzeController {
  public log = Container.get(LogService);
  public type = Container.get(TypeService);

  public getView = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('analyze', { currentUser: `${req.user.first_name} ${req.user.last_name}`, isAdmin: req.user.role.id == 1 });
    } catch (error) {
      next(error);
    }
  };

  public sendScript = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const analyze_rscript_path = 'src/resources/analyze_rscript.R';
      const analyze_rscript = fs.readFileSync(analyze_rscript_path, 'utf8');
      const analyze_rscript_injected = analyze_rscript.replace('##USER_SCRIPT_INJECTED##', this.change_quotes(String(req.body.script))).replace('##CSV_DATA##', "data <- read.csv('../test/WalkTheDogs.csv')\n");
      
      let filename: string = this.getTimestamp();
      this.generateRFileFromString(analyze_rscript_injected, filename, next);

      const listtypes:Type[] = await this.type.findAllType();

      let command: string = `Rscript -e "library(rmarkdown); rmarkdown::render(\'src/input/${filename}.Rmd\', output_format = \'html_document\', output_file = \'../output/${filename}.htm\');"`;
      exec(command, (error, stdout, stderr) => {
        const currentUser:User = new User();
        currentUser.id = 1; //TODO: change to real user
        if (error) {
          console.error(`Error executing R script: ${error}`);
          //TODO switch id user to current user id
          const newLog = new Log();
          newLog.file_path_input = `src/input/${filename}.Rmd`;
          newLog.text = `Error executing R script: ${error}`;
          newLog.user = currentUser;

          newLog.type = listtypes.find(type => type.name_type === "failure");

          this.log.createLog(newLog).catch((rej) =>
          {
            console.log(rej);
          });
          return;
        }
        else
        {
          //TODO switch id user to current user id

          const newLog = new Log();
          newLog.file_path_input = `src/input/${filename}.Rmd`;
          newLog.file_path_result = `../output/${filename}.htm`;
          newLog.text = `Success`;
          newLog.user = currentUser;
          newLog.type = newLog.type = listtypes.find(type => type.name_type === "success");
          this.log.createLog(newLog).catch((rej) =>
          {
            console.log(rej);
          });
        }
        fs.readFile('src/output/' + filename + '.htm', 'utf8', (err, data) => {
          if (err) {
            console.error(`Error reading .htm file: ${err}`);

            return;
          }
          res.status(200).json({ data: data, filename: filename, message: 'sent' });
        });
      });
    } catch (error) {
      next(error);
    }
  };

  public getTestOutputFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    fs.readFile('src/output/' + '20230807213518' + '.htm', 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading .htm file: ${err}`);
        return;
      }
      res.status(200).json({ data: data });
    });
  }

  private generateRFileFromString = async (script: string, filename: string, next: NextFunction): Promise<void> => {
    try {
      //TODO: add date and author's name
      let prepend: string = '```{r, error=TRUE, echo=FALSE}\n';
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

  // Need to replace all double quotes with single quotes so that the R script can be executed
  private change_quotes(script: string): string
  {
    //change all double quotes to single quotes
    script = script.replace(/"/g, '\'');

    return script;
  }
}
