cdrequire("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION,
  ssl:true,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  user: process.env.USER,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

module.exports = pool;