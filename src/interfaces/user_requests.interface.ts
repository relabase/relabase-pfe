import { RowDataPacket } from "mysql2";

export interface User_request extends RowDataPacket{
  id_user_request?: number;
  email:string;
  access_reason: string;
  is_approve: boolean;
  first_name:string;
  last_name:string;
  image:string;
}
