import { RowDataPacket } from "mysql2";

export interface Status extends RowDataPacket{
  id?: number;
  name_status: string;
}
