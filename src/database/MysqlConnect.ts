import{ createConnection } from 'mysql2'

//TODO test connection with docker 
export const connection = createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "db"
  });