import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Package_request } from '@models/package_request';
import { User_request } from '@models/user_request';


@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name_status: string;
  @OneToMany(()=>Package_request, package_request => package_request.status)
  package_requests: Package_request[];

  @OneToMany(()=>User_request, user_request => user_request.status)
  user_requests: User_request[];


}
