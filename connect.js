// connect.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Your MySQL username
  password: 'SHALEMRAJU22',         // Your MySQL password
  database: 'food_website'  // Your database name
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('✅ MySQL Connected!');
  }
});

module.exports = connection;
