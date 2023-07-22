import { RowDataPacket } from "mysql2";

export interface Package_request extends RowDataPacket{
  id?: number;
  name_package:string;
  reason:string;
  is_approve:boolean;
  id_user:number;
  link:string;
  id_status:number;
}
