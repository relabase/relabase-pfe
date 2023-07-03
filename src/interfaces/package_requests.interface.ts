import { RowDataPacket } from "mysql2";

export interface Package_request extends RowDataPacket{
  id_package_request?: number;
  email:string;
  access_reason: string;
  is_approve: number;
  first_name:string;
  last_name:string;
  filepath:string;
}
