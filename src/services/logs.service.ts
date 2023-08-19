import { Service } from 'typedi';
import { Log } from '@models/log';
import { connection } from '@/database/DataSource';
import { User } from '@/models/user';
import { DeleteResult } from 'typeorm';

const repo = connection.getRepository(Log);

@Service()
export class LogService {

  public async findAllLog(): Promise<Log[]> {
    return repo.find({
      select: [
        'id',
        'create_time',
        'text',
        'file_path_input',
        'file_path_result',
        'type'
      ],
      relations:{
        user:true
      }
    });
  }
  public async findAllLogByType(typeId: number): Promise<Log[]> {
    return repo.find({
      select: [
        'id',
        'create_time',
        'text',
        'file_path_input',
        'file_path_result',
        'type'
      ],
      where: {
        type: {id: typeId}
      },
      relations:{
        user:true
      }
    });
  }

  public async findLogById(logId: number): Promise<Log> {
    return repo.findOne({
      select: [
        'id',
        'create_time',
        'text',
        'file_path_input',
        'file_path_result',
        'type'
      ],
      where:{
        id:logId
      },
      relations:{
        user:true
      }
    });
  }

  public async createLog(log:Log): Promise<Log> {

    return repo.save(log);

  }

  public async deleteLog(LogId: number): Promise<DeleteResult> {
    return repo.delete(LogId);
  }

}
