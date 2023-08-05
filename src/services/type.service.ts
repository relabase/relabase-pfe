import { Service } from 'typedi';
import { Type } from '@models/type';
import { connection } from '@/database/DataSource';
import { DeleteResult } from 'typeorm';

const repo = connection.getRepository(Type);

@Service()
export class TypeService {
  public async findAllType(): Promise<Type[]> {
    return repo.find();
  }

  public async findTypeById(typeId: number): Promise<Type> {

    return repo.findOne(
      {where:{
        id: typeId
      }}
    );
  }

  public async findTypeByName(name: string): Promise<Type> {
    return repo.findOne(
      {where:{
        name_type: name
      }}
    );
  }

  public async createType(typeData: Type): Promise<Type> {
    return repo.save(typeData);
  }

  public async updateType(typeData: Type): Promise<Type> {
    return repo.save(typeData);
  }

  public async deleteType(typeId: number): Promise<DeleteResult> {
    return repo.delete(typeId);
  }
}
