require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  password: process.env.PASSWORD,
  user: process.env.USER,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

module.exports = pool;