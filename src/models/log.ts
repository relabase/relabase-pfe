
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { User } from '@models/user';
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
  @Column()
  type:string;
  @ManyToOne(() => User, user => user.logs)
  @JoinColumn({ name: 'id_user' })
  user:User
}
