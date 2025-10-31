const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connect'); // PostgreSQL pool
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

//Register Route
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

// Login Route
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

// ✅ Save Order Route
app.post('/order', (req, res) => {
  const { username, item, quantity, address, payment } = req.body;
  const sql = 'INSERT INTO orders (username, item, quantity, address, payment) VALUES ($1, $2, $3, $4, $5)';
  connection.query(sql, [username, item, quantity, address, payment], (err) => {
    if (err) {
      console.error('❌ Order saving failed:', err);
      return res.status(500).send('❌ Could not place order.');
    }
    console.log('✅ Order placed for:', username);
    res.send('✅ Order placed successfully!');
  });
});

// ✅ Serve Dashboard Page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// ✅ Get Orders by Username
// ✅ Get Orders for a Specific User
app.get('/api/orders/:username', (req, res) => {
  const username = req.params.username;
  const sql = 'SELECT * FROM orders WHERE username = $1 ORDER BY order_time DESC';
  connection.query(sql, [username], (err, result) => {
    if (err) {
      console.error('❌ Failed to fetch user orders:', err);
      return res.status(500).send('❌ Failed to load user orders.');
    }
    res.json(result.rows);
  });
});
// ✅ Get All Orders
app.get('/api/orders', (req, res) => {
  const sql = 'SELECT * FROM orders ORDER BY order_time DESC';

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('❌ Failed to fetch orders:', err);
      return res.status(500).send('❌ Failed to load orders.');
    }
    res.json(result.rows);
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
