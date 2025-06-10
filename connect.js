// connect.js
const mysql = require('mysql2');
require('dotenv').config(); // Load local .env in development

// Create connection using Railway's DATABASE_URL
const connection = mysql.createConnection({
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to Railway MySQL!');
  }
});

module.exports = connection;
