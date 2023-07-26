import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { Status } from '@models/status';

@Entity()
export class User_request{
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  email:string;
  @Column()
  message: string;
  @Column()
  first_name:string;
  @Column()
  last_name:string;
  @Column()
  image:string;
  @Column()
  google_id:string;
  @ManyToOne(() => Status, status => status.user_requests)
  @JoinColumn({name:"id_status"})
  status:Status;
}
