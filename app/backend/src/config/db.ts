import { SQL } from "bun";
import "bun:dotenv";

const mysql = new SQL({
  adapter: "mysql",
  hostname: Bun.env.DB_HOST || "localhost",
  port: Bun.env.DB_PORT ? parseInt(Bun.env.DB_PORT) : 3306,
  database: Bun.env.DB_NAME || "myapp",
  username: Bun.env.DB_USER || "dbuser",
  password: Bun.env.DB_PASSWORD || "secretpass",
});

export default mysql;