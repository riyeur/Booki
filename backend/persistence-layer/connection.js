import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const connection = await mysql.createConnection(process.env.DATABASE_URL);

export default connection;