import { DB_SERVER } from '@/config';
import { Role } from '@/models/role';
import { User } from '@/models/user';
import{ DataSource } from 'typeorm';

export const connection = new DataSource({
  type: "mysql",
  host: DB_SERVER,
  port: 3306,
  username: "root",
  password: "root",
  database: "db",
  entities:[Role,User]
});

connection.initialize().then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization", err)
})
