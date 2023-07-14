import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { User } from '@interfaces/users.interface';
import { OkPacket } from 'mysql2';
import { connection } from '@/database/MysqlConnect';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {

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
          console.log(res);
          if (err) reject(err);
          else resolve(res?.[0]);
        }
        )
    })
  }

  public async createUser(userData: User): Promise<User> {
    return new Promise((resolve,reject)=>{
      hash(userData.password, 10).then(
        (hashedPass)=>{
          console.log(hashedPass);
          connection.query<OkPacket>('INSERT INTO user(email,password,first_name,last_name,id_role,image) VALUE(?,?,?,?,?,?)', 
          [ userData.email,
            hashedPass,
            userData.first_name,
            userData.last_name,
            userData.id_role,
            userData.image ],
          (err,res)=>{
            if (err) reject(err);
            else
            {
              console.log("user " + userData.email + " created");
              resolve(userData);
            }
          });
        },
        (rej) => {
          reject(rej);
        }
      );
    })
  }

  public async updateUser(userId: number, userData: User): Promise<User> {

    return new Promise((resolve,reject)=>{
      hash(userData.password, 10).then((val)=>{

        connection.query<OkPacket>('UPDATE user SET password = ? WHERE id_user = ?', 
        [ val,
          userId],
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
      },
      (rej)=>{
        reject(rej);
      }
      );
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
