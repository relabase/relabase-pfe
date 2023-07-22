import { RowDataPacket } from "mysql2";

export interface Role extends RowDataPacket{
  id?: number;
  name_role?: string;
}
