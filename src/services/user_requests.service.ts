import { Service } from 'typedi';
import { connection } from '@/database/DataSource';
import { User_request } from '@/models/user_request';
import { DeleteResult } from 'typeorm';

const repo = connection.getRepository(User_request)

@Service()
export class User_requestService {
  public async findAllUser_request(): Promise<User_request[]> {
    return repo.find({
      relations:{
        status:true
      }
    });
  }

  public async findUser_requestById(user_requestId: number): Promise<User_request> {
    return repo.findOne({
      where:{
        id: user_requestId
      },
      relations:{
        status:true
      }
    })
  }

  public async findUser_requestByGoogleId(google_id: string): Promise<User_request> {
    return repo.findOne({
      where:{
        google_id: google_id
      },
      relations:{
        status:true
      }
    })
  }

  public async createUser_request(user_requestData: User_request): Promise<User_request> {
    return repo.save(user_requestData);

  }

  public async updateUser_request_status(user_requestData: User_request): Promise<User_request> {
    return repo.save(user_requestData);
  }

  public async deleteUser_request(user_requestId: number): Promise<DeleteResult> {
    return repo.delete(user_requestId);
  }
}
