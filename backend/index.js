const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./models/db');
const { verifyUser } = require('./modules/authentication');

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

// Authentication route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let retval = -1;
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Username and password are required' 
    });
  }

  try {
    // Query database for user credentials
    // const { rows } = await db.query(
    //   'SELECT * from users where username = $1 and password=$2',

    //   [username, password]
    // );

    retval = await verifyUser(username,password);
    console.log(retval);
    if (retval === -1) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
  
    // Successful authentication
    res.json({
      success: true,
      data: {
       'access_level':retval 
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
});


// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
