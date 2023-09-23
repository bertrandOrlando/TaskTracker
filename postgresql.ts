import postgres from "postgres";

const sql = postgres({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: "require",
});

sql`CREATE TYPE priority AS ENUM ('Low','Medium','High');`;

sql`CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL, 
  provider text 
);`;

sql`CREATE TABLE IF NOT EXISTS to_dos (
  id SERIAL PRIMARY KEY ,
  task text,
  description text,
  category varchar(20),
  time date ,
  priority priority ,
  fulfillment int ,
  user_id text REFERENCES users(id)
);`;

export default sql;
