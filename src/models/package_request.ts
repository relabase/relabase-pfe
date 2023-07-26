import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { User } from '@models/user';
import { Status } from '@models/status';

@Entity()
export class Package_request{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name_package:string;
  @Column()
  message:string;
  @Column()
  link:string;

  @ManyToOne(()=> User, user => user.package_requests)
  @JoinColumn({name:'id_user'})
  user:User;

  @ManyToOne(()=> Status, status => status.package_requests)
  @JoinColumn({name:'id_status'})
  status:Status;
}
