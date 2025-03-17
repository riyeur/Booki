import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'connection',
    password: 'securepassword',
    database: 'booki'
  })

export default connection;