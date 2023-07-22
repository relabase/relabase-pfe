import { RowDataPacket } from "mysql2";

export interface Role extends RowDataPacket{
  id?: number;
  nom_role?: string;
}
