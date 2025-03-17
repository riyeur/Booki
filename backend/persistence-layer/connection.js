import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log("DATABASE_URL:", process.env.CONNECTION_URL);

const connection = await mysql.createConnection(process.env.CONNECTION_URL);

export default connection;