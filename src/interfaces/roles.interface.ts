import { RowDataPacket } from "mysql2";

export interface Role extends RowDataPacket{
  id_role?: number;
  nom_role?: string;
}
