import { Service } from 'typedi';
import { User_request } from '@interfaces/user_requests.interface';
import { OkPacket } from 'mysql2';
import { connection } from '@/database/MysqlConnect';

@Service()
export class User_requestService {
  public async findAllUser_request(): Promise<User_request[]> {

    return new Promise((resolve,reject) =>
    connection.query<User_request[]>('SELECT * FROM `user_request`',  
    (err,res)=>{
      console.log(res);
      if (err) reject(err);
      else resolve(res);
    })
   )
  }

  public async findUser_requestById(user_requestId: number): Promise<User_request> {

    return new Promise((resolve,reject) => {
      connection.query<User_request[]>(
        'SELECT * FROM `user_request` where id_user_request = ?',
        [ user_requestId ],
        (err,res) => {
          console.log(res);
          if (err) reject(err);
          else resolve(res?.[0]);
        }
        )
    })
  }

  public async createUser_request(user_requestData: User_request): Promise<User_request> {
    return new Promise((resolve,reject)=>{
      connection.query<OkPacket>('INSERT INTO user_request(email,access_reason,filepath,first_name,last_name) VALUE(?,?,?,?,?)', 
      [ user_requestData.email,
        user_requestData.access_reason,
        user_requestData.filepath,
        user_requestData.first_name,
        user_requestData.last_name],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          console.log("user_request " + user_requestData.email + " created");
          resolve(user_requestData);
        }
      });
    }
      );
    
  }
/*
  public async updateUser_request(user_requestId: number, user_requestData: User_request): Promise<User_request> {

    return new Promise((resolve,reject)=>{
      hash(user_requestData.password, 10).then((val)=>{

        connection.query<OkPacket>('UPDATE user_request SET password = ? WHERE id_user_request = ?', 
        [ val,
          user_requestId],
        (err,res)=>{
          if (err) reject(err);
          else
          {
            this.findUser_requestById(user_requestId)
            .then((res)=>{
              console.log(res);
              resolve(res);
            })
            .catch(reject);
          }
        });
      },
      (rej)=>{
        reject(rej);
      }
      );
    })
  }
*/
  public async deleteUser_request(user_requestId: number): Promise<User_request> {
    return new Promise((resolve,reject)=>{

      this.findUser_requestById(user_requestId)
      .then((user_requests) => {

        connection.query<OkPacket>('DELETE FROM user_request WHERE id_user_request = ?', 
        [ user_requestId ],
        (err,res)=>{
          if (err) reject(err);
          else
          {
            this.findUser_requestById(user_requestId)
            .then((res)=>{
              console.log(res);
              resolve(user_requests);
            })
            .catch(reject);
          }
        });
      })
      .catch(reject);
    })
  }
}
