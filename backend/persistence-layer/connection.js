import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'connection',
    password: process.env.DB_PASSWORD || 'securepassword',
    database: process.env.DB_NAME || 'booki',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection;
