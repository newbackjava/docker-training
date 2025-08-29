const express = require('express');
const mysql = require('mysql2/promise');
const { createClient } = require('redis');

const {
  PORT = 3000,
  DB_HOST = 'db',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '1212',
  DB_NAME = 'demo_db',
  REDIS_URL = 'redis://redis:6379/0',
} = process.env;

const app = express();

let pool;
let redisClient;

async function init() {
  // MySQL 커넥션 풀
  pool = await mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Redis 클라이언트
  redisClient = createClient({ url: REDIS_URL });
  redisClient.on('error', (err) => console.error('Redis error:', err));
  await redisClient.connect();

  app.get('/', (req, res) => {
    res.send('Hello from Node + Express!');
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/mysql', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT NOW() AS now');
      res.send(`MySQL OK. NOW() = ${rows[0].now}`);
    } catch (e) {
      console.error(e);
      res.status(500).send(`MySQL connection failed: ${e.message}`);
    }
  });

  app.get('/users', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT id, name, created_at FROM users ORDER BY id');
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).send(`Users query failed: ${e.message}`);
    }
  });

  app.get('/redis-set', async (req, res) => {
    try {
      const key = req.query.key || 'color';
      const value = req.query.value || 'blue';
      await redisClient.set(key, value);
      res.send(`Redis SET OK. ${key}=${value}`);
    } catch (e) {
      console.error(e);
      res.status(500).send(`Redis SET failed: ${e.message}`);
    }
  });

  app.get('/redis-get', async (req, res) => {
    try {
      const key = req.query.key || 'color';
      const value = await redisClient.get(key);
      res.send(`Redis GET OK. ${key}=${value}`);
    } catch (e) {
      console.error(e);
      res.status(500).send(`Redis GET failed: ${e.message}`);
    }
  });

  app.get('/redis-incr', async (req, res) => {
    try {
      const key = req.query.key || 'visits';
      const val = await redisClient.incr(key);
      res.send(`Redis INCR OK. ${key}=${val}`);
    } catch (e) {
      console.error(e);
      res.status(500).send(`Redis INCR failed: ${e.message}`);
    }
  });

  app.listen(Number(PORT), () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

init().catch((e) => {
  console.error('Fatal init error:', e);
  process.exit(1);
});
