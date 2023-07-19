import { DB_SERVER } from '@/config';
import{ createConnection } from 'mysql2'

export const connection = createConnection({
  host: DB_SERVER,
  port: 3306,
  user: "root",
  password: "root",
  database: "db"
});

  connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});