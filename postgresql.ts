import postgres from "postgres";

const sql = postgres(
  "postgres://default:pZsLUNCwP75H@ep-silent-wood-52073588.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb",
);

export default sql;
