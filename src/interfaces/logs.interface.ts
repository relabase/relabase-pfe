import { RowDataPacket } from "mysql2";

export interface Log extends RowDataPacket{
  id_log?: number;
  create_time?: string;
  text: string;
  id_user:number;
  file_path_input:string;
  file_path_result:string;
}
