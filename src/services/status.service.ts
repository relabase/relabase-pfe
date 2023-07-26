import { Service } from 'typedi';
import { Status } from '@models/status';
import { connection } from '@/database/DataSource';
import { DeleteResult } from 'typeorm';

const repo = connection.getRepository(Status);

@Service()
export class StatusService {
  public async findAllStatus(): Promise<Status[]> {
    return repo.find();
  }

  public async findStatusById(statusId: number): Promise<Status> {

    return repo.findOne(
      {where:{
        id: statusId
      }}
    );
  }

  public async findStatusByName(name: string): Promise<Status> {
    return repo.findOne(
      {where:{
        name_status: name
      }}
    );
  }

  public async createStatus(statusData: Status): Promise<Status> {
    return repo.save(statusData);
  }

  public async updateStatus(statusData: Status): Promise<Status> {
    return repo.save(statusData);
  }

  public async deleteStatus(statusId: number): Promise<DeleteResult> {
    return repo.delete(statusId);
  }
}
