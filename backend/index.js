const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/db');

// Middleware
app.use(express.json());
app.use(cors());

// Branches route
// Route to get all store branches
app.get('/branches', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM storebranch');
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (err) {
    console.error('Error fetching store branches:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store branches'
    });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
