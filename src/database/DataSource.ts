import { DB_SERVER } from '@/config';
import { Role } from '@/models/role';
import { User } from '@/models/user';
import { Log } from '@/models/log';
import{ DataSource } from 'typeorm';
import { Package_request } from '@/models/package_request';
import { Status } from '@/models/status';
import { User_request } from '@/models/user_request';

export const connection = new DataSource({
  type: "mysql",
  host: DB_SERVER,
  port: 3306,
  username: "root",
  password: "root",//TODO change password
  database: "db",
  entities:[Role,User,Log, Package_request, Status, User_request]
});

connection.initialize().then(() => {
  console.log('Connected to MySQL Server!');
})
.catch((err) => {
  console.error("Error when connecting to MySQL Server", err)
})
