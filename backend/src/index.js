require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const waitForDB = async () => {
  while (true) {
    try {
      await pool.query("SELECT 1");
      console.log("DB CONNECTED");
      break;
    } catch (err) {
      console.log("DB bekleniyor...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
};

const startServer = async () => {
  await waitForDB();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS people (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);
  console.log("TABLE READY");

  app.get("/", (req, res) => {
    res.send("Backend çalışıyor");
  });

  app.get('/api/people', async (req, res) => {
    const result = await pool.query("SELECT * FROM people ORDER BY id");
    res.json(result.rows);
  });

  app.post('/api/people', async (req, res) => {
    const { full_name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO people (full_name, email) VALUES ($1, $2) RETURNING *",
      [full_name, email]
    );

    res.json(result.rows[0]);
  });

  app.listen(8080, '0.0.0.0', () => {
    console.log("Backend running on 8080");
  });
};

startServer();