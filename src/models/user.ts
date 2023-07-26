import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm'
import { Role } from '@models/role';
import { Log } from '@models/log';
import { Package_request } from '@/models/package_request';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  first_name:string;
  @Column()
  last_name:string;
  @Column()
  image:string;
  @Column()
  last_login: Date;
  @Column()
  google_id:string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'id_role' })
  role: Role;

  @OneToMany(() => Log, log => log.user)
  logs: Log[];

  @OneToMany(() => Package_request, package_request => package_request.user)
  package_requests: Package_request[];
}
