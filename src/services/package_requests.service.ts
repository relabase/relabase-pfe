import { Service } from 'typedi';
import { connection } from '@/database/DataSource';
import { Package_request } from '@/models/package_request';
import { DeleteResult } from 'typeorm';


const repo = connection.getRepository(Package_request);

@Service()
export class Package_requestService {

  public async findAllPackage_request(): Promise<Package_request[]> {

    return repo.find({
      relations:{
        status:true,
        user:true
      }
    });
  }

  public async findAllPackage_requestByStatus(statusId: number): Promise<Package_request[]> {

    return repo.find({
      where: {
        status: { id: statusId }
      },
      relations:{
        status:true,
        user:true
      }
    });
  }

  public async findPackage_requestById(package_requestId: number): Promise<Package_request> {

    return repo.findOne({
      where:{
        id : package_requestId
      },
      relations:{
        status:true,
        user:true
      }
    })
  }
  public async createPackage_request(package_requestData: Package_request): Promise<Package_request> {
    return repo.save(package_requestData);
  }
  public async updatePackage_request_status(package_requestData: Package_request): Promise<Package_request> {
    return repo.save(package_requestData);
  }

  public async deletePackage_request(package_requestId: number): Promise<DeleteResult> {
    return repo.delete(package_requestId);
  }

}
