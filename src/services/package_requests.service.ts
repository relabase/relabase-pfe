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
        'SELECT * FROM `package_request` where id = ?',
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
      connection.query<OkPacket>('INSERT INTO package_request(name_package,reason,id_user,link,id_status) VALUE(?,?,?,?,?)', 
      [ package_requestData.name_package,
        package_requestData.reason,
        package_requestData.id_user,
        package_requestData.link,
        package_requestData.id_status ],

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

  public async approvePackage_request(package_requestId: number): Promise<OkPacket> {

    return new Promise((resolve,reject)=>{
      connection.query<OkPacket>('UPDATE package_request SET id_status = 2 WHERE id = ?', 
      [package_requestId],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          resolve(res);
        }
      });
  })
  }
  public async rejectPackageRequest(package_requestId: number): Promise<OkPacket> {

    return new Promise((resolve,reject)=>{
      connection.query<OkPacket>('UPDATE package_request SET id_status = 3 WHERE id = ?', 
      [package_requestId],
      (err,res)=>{
        if (err) reject(err);
        else
        {
          resolve(res);
        }
      });
  })
  }

  public async deletePackage_request(package_requestId: number): Promise<Package_request> {
    return new Promise((resolve,reject)=>{

      this.findPackage_requestById(package_requestId)
      .then((package_requests) => {

        connection.query<OkPacket>('DELETE FROM package_request WHERE id = ?', 
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
