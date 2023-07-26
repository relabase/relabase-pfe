import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { User } from '@models/user';
import { connection } from '@/database/DataSource';
import { DeleteResult } from 'typeorm';

const repo = connection.getRepository(User);

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    return repo.find({
      relations: {
        role:true
    }});
  }

  public async findUserById(userId: number): Promise<User> {
    return repo.findOne({
      where:{
        id: userId
      },
      relations: {
        role:true
    }});
  }

  public async findUserByGoogleId(googleId: string): Promise<User> {

    return new Promise((resolve,reject) => {
      connection.query<User[]>(
        'SELECT * FROM `user` where google_id = ?',
        [ googleId ],
        (err,res) => {
          // console.log(res);
          if (err) reject(err);
          else resolve(res?.[0]);
        }
        )
    })
  }

  public async createUser(userData: User): Promise<User> {
    return new Promise((resolve)=>{
      hash(userData.password, 10).then((hashedPass)=>{
        userData.password = hashedPass;
        resolve(repo.save(userData));
      });

    })
  }

  public async updateUser(userData: User): Promise<User> {
    return new Promise((resolve)=>{
      hash(userData.password, 10).then((hashedPass)=>{
        userData.password = hashedPass;
        resolve(repo.save(userData));
      });

    })
  }

  public async deleteUser(userId: number): Promise<DeleteResult> {
    return repo.delete(userId);
  }
}
