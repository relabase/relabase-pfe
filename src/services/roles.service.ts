import { Service } from 'typedi';
import { Role } from '@interfaces/roles.interface';
import { OkPacket } from 'mysql2';
import { connection } from '@/database/MysqlConnect';

@Service()
export class RoleService {
  public async findAllRole(): Promise<Role[]> {
    return new Promise((resolve,reject) =>
    connection.query<Role[]>('SELECT * FROM `role`',  
    (err,res)=>{
      console.log(res);
      if (err) reject(err);
      else resolve(res);
    })
   )
  }

  public async findRoleById(roleId: number): Promise<Role> {

    return new Promise((resolve,reject) => {
      connection.query<Role[]>(
        'SELECT * FROM `role` where id_role = ?',
        [ roleId ],
        (err,res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
        )
    })
  }

  public async createRole(roleData: Role): Promise<Role> {
    return new Promise((resolve,reject)=>{

      connection.query<OkPacket>('INSERT INTO role(nom_role) VALUES(?)', 
      [ roleData.nom_role ],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          console.log(res);
          resolve(roleData);
        }
      });
      

    })
  }

  public async updateRole(roleId: number, roleData: Role): Promise<Role> {

    return new Promise((resolve,reject)=>{

      connection.query<OkPacket>('UPDATE role SET nom_role = ? WHERE id_role = ?', 
      [ roleData.nom_role, roleId],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          this.findRoleById(roleId)
          .then((res)=>{
            console.log(res);
            resolve(res);
          })
          .catch(reject);
        }
      });
    })
  }

  public async deleteRole(roleId: number): Promise<Role> {
    return new Promise((resolve,reject)=>{

      this.findRoleById(roleId)
      .then((roles) => {

        connection.query<OkPacket>('DELETE FROM role WHERE id_role = ?', 
        [ roleId ],
        (err,res)=>{
          if (err) reject(err);
          else
          {
            this.findRoleById(roleId)
            .then((res)=>{
              console.log(res);
              resolve(roles);
            })
            .catch(reject);
          }
        });
      })
      .catch(reject);
    })
  }
}
