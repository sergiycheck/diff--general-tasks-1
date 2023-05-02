import pg, { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5435,
  user: "postgres",
  password: "postgres",
  database: "postgres",
});

export default client;
