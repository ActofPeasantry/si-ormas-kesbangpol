import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
// import * as schema from "./schema";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER!,
  database: process.env.DB_NAME!,
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle({ client: connection });
