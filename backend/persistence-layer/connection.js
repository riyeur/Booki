import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
    uri: process.env.MYSQL_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection;