require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');
const apiKeyAuth = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(apiKeyAuth);

app.get('/api/countries', (req, res) => {
  const query = 'SELECT * FROM countries';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching countries:', err);
      res.status(500).json({ error: 'Failed to fetch countries' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/statistics/:country_code', (req, res) => {
  const country_code = req.params.country_code;

  if (!country_code || country_code.length !== 2) {
    res.status(400).json({ error: 'Invalid country code' });
    return;
  }

  const query = `
    SELECT 
      c.country_code, c.country_name,
      wb.year AS wb_year, wb.rate AS wb_rate,
      itu.year AS itu_year, itu.rate AS itu_rate,
      cia.year AS cia_year, cia.users AS cia_users,
      n.notes
    FROM countries c
    LEFT JOIN wb_rates wb ON c.country_code = wb.country_code
    LEFT JOIN itu_rates itu ON c.country_code = itu.country_code
    LEFT JOIN cia_users cia ON c.country_code = cia.country_code
    LEFT JOIN notes n ON c.country_code = n.country_code
    WHERE c.country_code = ?
  `;

  db.query(query, [country_code], (err, results) => {
    if (err) {
      console.error('Error fetching country:', err);
      res.status(500).json({ error: 'Failed to fetch country' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Country not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.get('/api/countries/wb-rates', (req, res) => {
  const query = `
  SELECT c.country_code, c.country_name, wb.year AS wb_year, wb.rate AS wb_rate
  FROM countries c
  LEFT JOIN wb_rates wb ON c.country_code = wb.country_code
  ORDER BY wb.rate DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching WB rates:', err);
      res.status(500).json({ error: 'Failed to fetch WB rates' });
      return;
    }
    res.json(results);
  });
});


// ✅ Export `app` for testing
module.exports = app;

// ✅ Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}
