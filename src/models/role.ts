
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { User } from '@models/user';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name_role: string;
  @OneToMany(() => User, user => user.role)
  users: User[];
}
