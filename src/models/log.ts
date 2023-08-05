
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { User } from '@models/user';
import { Type } from '@models/type';
@Entity()
export class Log{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  create_time?: Date;
  @Column()
  text: string;

  @Column()
  file_path_input:string;
  @Column()
  file_path_result:string;

  @ManyToOne(() => User, user => user.logs)
  @JoinColumn({ name: 'id_user' })
  user:User

  @ManyToOne(() => Type, type => type.logs)
  @JoinColumn({ name: 'id_type' })
  type:Type
}
