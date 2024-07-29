const { Pool } = require('pg');
require('dotenv').config();

const USER = process.env.DB_USER;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;

const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: 5433
});

module.exports = {
    pool: pool,
    dbConnect: () => {
        return pool.connect(); 
    }
};
