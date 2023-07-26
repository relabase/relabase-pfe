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
      select:{
        id:true,
        create_time:true,
        text:true,
        file_path_input:true,
        file_path_result:true,
        type:true,
        user:{
          id:true
        }
      },
      relations:{
        user:true
      }
    });
  }

  public async findLogById(logId: number): Promise<Log> {
    return repo.findOne({
      select:{
        id:true,
        create_time:true,
        text:true,
        file_path_input:true,
        file_path_result:true,
        type:true,
        user:{
          id:true
        }
      },
      where:{
        id:logId
      },
      relations:{
        user:true
      }
    });
  }

  public async createLog(file_path_input:string,file_path_result:string,user:User, text:string): Promise<Log> {
    const newLog:Log = new Log();

    newLog.file_path_input= file_path_input;
    newLog.file_path_result = file_path_result;
    newLog.user = user;
    newLog.text = text;
    return repo.save(newLog);

  }

  public async deleteLog(LogId: number): Promise<DeleteResult> {
    return repo.delete(LogId);
  }

}
