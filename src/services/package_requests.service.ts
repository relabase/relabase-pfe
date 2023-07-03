import { Service } from 'typedi';
import { Package_request } from '@interfaces/package_requests.interface';
import { OkPacket } from 'mysql2';
import { connection } from '@/database/MysqlConnect';

@Service()
export class Package_requestService {
  public async findAllPackage_request(): Promise<Package_request[]> {

    return new Promise((resolve,reject) =>
    connection.query<Package_request[]>('SELECT * FROM `package_request`',  
    (err,res)=>{
      console.log(res);
      if (err) reject(err);
      else resolve(res);
    })
   )
  }

  public async findPackage_requestById(package_requestId: number): Promise<Package_request> {

    return new Promise((resolve,reject) => {
      connection.query<Package_request[]>(
        'SELECT * FROM `package_request` where id_package_request = ?',
        [ package_requestId ],
        (err,res) => {
          console.log(res);
          if (err) reject(err);
          else resolve(res?.[0]);
        }
        )
    })
  }

  public async createPackage_request(package_requestData: Package_request): Promise<Package_request> {
    return new Promise((resolve,reject)=>{
      connection.query<OkPacket>('INSERT INTO package_request(name_package,reason) VALUE(?,?)', 
      [ package_requestData.name_package,
        package_requestData.reason],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          console.log("package_request " + package_requestData.name_package + " created");
          resolve(package_requestData);
        }
      });
    }
      );
    
  }
/*
  public async updatePackage_request(package_requestId: number, package_requestData: Package_request): Promise<Package_request> {

    return new Promise((resolve,reject)=>{
      hash(package_requestData.password, 10).then((val)=>{

        connection.query<OkPacket>('UPDATE package_request SET password = ? WHERE id_package_request = ?', 
        [ val,
          package_requestId],
        (err,res)=>{
          if (err) reject(err);
          else
          {
            this.findPackage_requestById(package_requestId)
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
  public async deletePackage_request(package_requestId: number): Promise<Package_request> {
    return new Promise((resolve,reject)=>{

      this.findPackage_requestById(package_requestId)
      .then((package_requests) => {

        connection.query<OkPacket>('DELETE FROM package_request WHERE id_package_request = ?', 
        [ package_requestId ],
        (err,res)=>{
          if (err) reject(err);
          else
          {
            this.findPackage_requestById(package_requestId)
            .then((res)=>{
              console.log(res);
              resolve(package_requests);
            })
            .catch(reject);
          }
        });
      })
      .catch(reject);
    })
  }
}
