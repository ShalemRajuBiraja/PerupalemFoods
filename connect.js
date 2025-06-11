// connect.js
const mysql = require('mysql2');
require('dotenv').config();

// Parse the DATABASE_URL
const dbUrl = new URL(process.env.DATABASE_URL);

const connection = mysql.createConnection({
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', '') // removes the "/" before db name
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ MySQL Connected!');
  }
});

module.exports = connection;



