import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Log } from '@interfaces/logs.interface';
import { OkPacket } from 'mysql2';//Pour la création d'un user seulement
import { connection } from '@/database/MysqlConnect';

@Service()
export class LogService {
  public async findAllLog(): Promise<Log[]> {
    var thing:Promise<Log>;
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
/*
  public async deleteUser(userId: number): Promise<User> {
    return new Promise((resolve,reject)=>{

      this.findUserById(userId)
      .then((users) => {

        connection.query<OkPacket>('DELETE FROM user WHERE id_user = ?', 
        [ userId ],
        (err,res)=>{
          if (err) reject(err);
          else
          {
            this.findUserById(userId)
            .then((res)=>{
              console.log(res);
              resolve(users);
            })
            .catch(reject);
          }
        });
      })
      .catch(reject);
    })
  }
  */
}
