import { RowDataPacket } from "mysql2";

export interface Log extends RowDataPacket{
  id?: number;
  create_time?: Date;
  text: string;
  id_user:number;
  file_path_input:string;
  file_path_result:string;
  type:string;
}
