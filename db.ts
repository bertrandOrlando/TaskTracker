import mysql, { ConnectionOptions } from "mysql2";

const access: ConnectionOptions = {
  host: "127.0.0.1",
  user: "root",
  password: "admin",
  database: "to_do_lists",
};

const connection = mysql.createConnection(access);

export default connection;
