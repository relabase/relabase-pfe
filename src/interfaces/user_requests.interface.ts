import { RowDataPacket } from "mysql2";

export interface User_request extends RowDataPacket{
  id?: number;
  email:string;
  message: string;
  first_name:string;
  last_name:string;
  image:string;
  id_status:number;
  google_id:string;
}
