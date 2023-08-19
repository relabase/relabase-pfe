import { DB_SERVER, DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USERNAME } from '@/config';
import { Role } from '@/models/role';
import { User } from '@/models/user';
import { Log } from '@/models/log';
import{ DataSource } from 'typeorm';
import { Package_request } from '@/models/package_request';
import { Status } from '@/models/status';
import { User_request } from '@/models/user_request';
import { Type } from '@/models/type';

export const connection = new DataSource({
  type: "mysql",
  host: DB_SERVER,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,//TODO change password
  database: DB_DATABASE,
  entities:[Role,User,Log, Package_request, Status, User_request,Type]
});

connection.initialize().then(() => {
  console.log('Connected to MySQL Server!');
})
.catch((err) => {
  console.error("Error when connecting to MySQL Server", err)
})
