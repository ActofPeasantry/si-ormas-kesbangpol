import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = await mysql.createPool({
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER!,
  database: process.env.DB_NAME!,
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle(poolConnection);
