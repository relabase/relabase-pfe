import { Service } from 'typedi';
import { Status } from '@interfaces/status.interface';
import { OkPacket } from 'mysql2';
import { connection } from '@/database/MysqlConnect';

@Service()
export class StatusService {
  public async findAllStatus(): Promise<Status[]> {
    return new Promise((resolve,reject) =>
    connection.query<Status[]>('SELECT * FROM `status`',  
    (err,res)=>{
      console.log(res);
      if (err) reject(err);
      else resolve(res);
    })
   )
  }

  public async findStatusById(statusId: number): Promise<Status> {

    return new Promise((resolve,reject) => {
      connection.query<Status[]>(
        'SELECT * FROM `status` where id = ?',
        [ statusId ],
        (err,res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
        )
    })
  }

  public async createStatus(statusData: Status): Promise<Status> {
    return new Promise((resolve,reject)=>{

      connection.query<OkPacket>('INSERT INTO status(name_status) VALUES(?)', 
      [ statusData.name_status ],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          console.log(res);
          resolve(statusData);
        }
      });
      

    })
  }

  public async updateStatus(statusId: number, statusData: Status): Promise<Status> {

    return new Promise((resolve,reject)=>{

      connection.query<OkPacket>('UPDATE status SET name_status = ? WHERE id = ?', 
      [ statusData.name_status, statusId],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          this.findStatusById(statusId)
          .then((res)=>{
            console.log(res);
            resolve(res);
          })
          .catch(reject);
        }
      });
    })
  }

  public async deleteStatus(statusId: number): Promise<Status> {
    return new Promise((resolve,reject)=>{

      this.findStatusById(statusId)
      .then((status) => {

        connection.query<OkPacket>('DELETE FROM status WHERE id = ?', 
        [ statusId ],
        (err,res)=>{
          if (err) reject(err);
          else
          {
            this.findStatusById(statusId)
            .then((res)=>{
              console.log(res);
              resolve(status);
            })
            .catch(reject);
          }
        });
      })
      .catch(reject);
    })
  }
}
