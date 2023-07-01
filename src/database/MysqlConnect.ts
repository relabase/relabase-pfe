import{ createConnection } from 'mysql2'

export const connection = createConnection({
    host: "db-server",
    port: 3306,
    user: "root",
    password: "root",
    database: "db"
  });