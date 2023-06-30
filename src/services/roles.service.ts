import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { OkPacket } from 'mysql2';//Pour la création d'un user seulement
import { connection } from '@/database/MysqlConnect';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    var thing:Promise<User>;
    return new Promise((resolve,reject) =>
    connection.query<User[]>('SELECT * FROM `user`',  
    (err,res)=>{
      console.log(res);
      if (err) reject(err);
      else resolve(res);
    })
   )
  }

  public async findUserById(userId: number): Promise<User> {

    return new Promise((resolve,reject) => {
      connection.query<User[]>(
        'SELECT * FROM `user` where id_user = ?',
        [ userId ],
        (err,res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
        )
    })
  }

  public async createUser(userData: User): Promise<User> {
    return new Promise((resolve,reject)=>{
      const hashedPassword = hash(userData.password, 10);

      connection.query<OkPacket>('INSERT INTO user(email,pasword) VALUES(?,?,?)', 
      [ userData.email,hashedPassword],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          console.log("user " + userData.email + " created");
        }
      });
      

    })
  }

  public async updateUser(userId: number, userData: User): Promise<User> {

    return new Promise((resolve,reject)=>{
      const hashedPassword = hash(userData.password, 10);

      connection.query<OkPacket>('UPDATE user SET password = ? WHERE id_user = ?', 
      [ hashedPassword, userId],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          this.findUserById(userId)
          .then((res)=>{
            console.log(res);
            resolve(res);
          })
          .catch(reject);
        }
      });
    })
  }

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
}
