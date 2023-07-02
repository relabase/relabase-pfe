import { Service } from 'typedi';

import { Log } from '@interfaces/logs.interface';
import { OkPacket } from 'mysql2';
import { connection } from '@/database/MysqlConnect';

@Service()
export class LogService {
  public async findAllLog(): Promise<Log[]> {
    return new Promise((resolve,reject) =>
    connection.query<Log[]>('SELECT * FROM `log`',  
    (err,res)=>{
      console.log(res);
      if (err) reject(err);
      else resolve(res);
    })
   )
  }

  public async findLogById(logId: number): Promise<Log> {

    return new Promise((resolve,reject) => {
      connection.query<Log[]>(
        'SELECT * FROM `log` where id_log = ?',
        [ logId ],
        (err,res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
        )
    })
  }

  public async createLog(logData: Log): Promise<Log> {
    return new Promise((resolve,reject)=>{
      connection.query<OkPacket>('INSERT INTO log(text) value(?)', 
      [ logData.text ],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          console.log("log created");
          resolve(logData);
        }
      });
      

    })
  }

  public async deleteLog(LogId: number): Promise<Log> {
    return new Promise((resolve,reject)=>{

      this.findLogById(LogId)
      .then((Logs) => {

        connection.query<OkPacket>('DELETE FROM Log WHERE id_Log = ?', 
        [ LogId ],
        (err,res)=>{
          if (err) reject(err);
          else
          {
            this.findLogById(LogId)
            .then((res)=>{
              console.log(res);
              resolve(Logs);
            })
            .catch(reject);
          }
        });
      })
      .catch(reject);
    })
  }
  
}
