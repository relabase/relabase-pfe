import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket{
  id?: number;
  email?: string;
  password: string;
  first_name:string;
  last_name:string;
  id_role:number;
}
