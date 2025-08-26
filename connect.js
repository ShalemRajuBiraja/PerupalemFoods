const { Pool } = require("pg");
require("dotenv").config();

// Create Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for external DB (Render/Heroku/etc.)
  },
});

// Test connection
pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected!"))
  .catch((err) => console.error("❌ PostgreSQL connection failed:", err));

module.exports = pool;
