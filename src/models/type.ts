import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Log } from '@models/log';


@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name_type: string;


  @OneToMany(()=> Log, log => log.type)
  logs: Log[];

}
