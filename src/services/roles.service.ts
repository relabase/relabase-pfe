import { Service } from 'typedi';
import { Role } from '@models/role';
import { connection } from '@/database/DataSource';
import { DeleteResult } from 'typeorm';

const repo = connection.getRepository(Role);

@Service()
export class RoleService {

  public async findAllRole(): Promise<Role[]> {

    return repo.find();

  }

  public async findRoleById(roleId: number): Promise<Role> {
    return repo.findOne({where : {
      id : roleId
    }
    });

  }
  findRoleByName(name: string): Promise<Role> {
    return repo.findOne({where : {
      name_role : name
    }
    });
  }

  public async createRole(roleData: Role): Promise<Role> {
    return repo.save(roleData);
  }

  public async updateRole(roleData: Role): Promise<Role> {
    return repo.save(roleData);
  }

  public async deleteRole(roleId: number): Promise<DeleteResult> {
    return repo.delete(roleId);
  }
}
