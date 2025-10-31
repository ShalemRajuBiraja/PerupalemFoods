// ✅ Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./connect"); // Your DB connection file
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Middleware
app.use(express.static(__dirname)); // Serve HTML/CSS/JS files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Test Database Connection
connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ PostgreSQL Connected!");
  }
});

// =====================================================
// 🧩 1️⃣ REGISTER USER
// =====================================================
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.type("text/plain").send("❌ All fields are required.");
  }

  const sql =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

  connection.query(sql, [username, email, password], (err) => {
    if (err) {
      console.error("❌ Registration failed:", err);
      return res.type("text/plain").status(500).send("❌ Registration failed.");
    }

    console.log("✅ User registered:", username);
    res.type("text/plain").send("✅ Registration successful!");
  });
});

// =====================================================
// 🧩 2️⃣ LOGIN USER
// =====================================================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = $1 AND password = $2";

  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("❌ Login query failed:", err);
      return res.type("text/plain").status(500).send("❌ Login failed.");
    }

    if (result.rows.length > 0) {
      console.log("✅ Login success for:", email);
      res.type("text/plain").send("✅ Login success!");
    } else {
      res.type("text/plain").send("❌ Invalid credentials.");
    }
  });
});

// =====================================================
// 🧩 3️⃣ PLACE ORDER
// =====================================================
app.post("/order", (req, res) => {
  const { username, item, quantity, address, payment } = req.body;

  if (!username || !item || !quantity || !address || !payment) {
    return res.type("text/plain").send("❌ All fields are required to place an order.");
  }

  const sql =
    "INSERT INTO orders (username, item, quantity, address, payment) VALUES ($1, $2, $3, $4, $5)";
  connection.query(sql, [username, item, quantity, address, payment], (err) => {
    if (err) {
      console.error("❌ Order saving failed:", err);
      return res.type("text/plain").status(500).send("❌ Could not place order.");
    }

    console.log("✅ Order placed for:", username);
    res.type("text/plain").send("✅ Order placed successfully!");
  });
});

// =====================================================
// 🧩 4️⃣ FETCH USER-SPECIFIC ORDERS (Dashboard)
// =====================================================
app.get("/api/orders/:username", (req, res) => {
  const { username } = req.params;

  const sql = "SELECT * FROM orders WHERE username = $1 ORDER BY order_time DESC";
  connection.query(sql, [username], (err, result) => {
    if (err) {
      console.error("❌ Failed to fetch orders:", err);
      return res.status(500).send("❌ Could not load your orders.");
    }

    console.log(`✅ Orders fetched for user: ${username}`);
    res.json(result.rows);
  });
});

// =====================================================
// 🧩 5️⃣ DASHBOARD PAGE (optional)
// =====================================================
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// =====================================================
// 🚀 START SERVER
// =====================================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
