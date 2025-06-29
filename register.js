const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connect'); // PostgreSQL pool

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ✅ Register Route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
  connection.query(sql, [username, email, password], (err) => {
    if (err) {
      console.error('❌ Error inserting user:', err);
      return res.status(500).send('❌ Registration failed.');
    }
    console.log('✅ User registered:', username);
    res.send('✅ Registration successful!');
  });
});

// ✅ Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';

  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('❌ Login query failed:', err);
      return res.status(500).send('❌ Login failed.');
    }

    if (result.rows.length > 0) {
      console.log('✅ Login success for:', email);
      res.send('✅ Login success!');
    } else {
      res.send('❌ Invalid credentials.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
