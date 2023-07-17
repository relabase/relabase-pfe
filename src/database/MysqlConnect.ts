import{ createConnection } from 'mysql2'

export const connection = createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "db"
});

  connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});