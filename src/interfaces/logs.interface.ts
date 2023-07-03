import { RowDataPacket } from "mysql2";

export interface Log extends RowDataPacket{
  id_log?: number;
  create_time?: string;
  text: string;
  author:string;
}
