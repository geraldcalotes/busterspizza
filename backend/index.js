const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./models/db');
const { verifyUser } = require('./modules/authentication');
const StoreBranch = require('./models/StoreBranch');
const User = require('./models/User');

// Middleware
app.use(express.json());
app.use(cors());

// Store Branches routes
// Get all store branches
app.get('/api/store-branches', async (req, res) => {
  try {
    const storeBranches = await StoreBranch.findAll();
    res.json({
      success: true,
      data: storeBranches
    });
  } catch (error) {
    console.error('Error fetching store branches:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store branches'
    });
  }
});

// Get a single store branch by ID
app.get('/api/store-branches/:storeId', async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const storeBranch = await StoreBranch.findById(storeId);
    
    res.json({
      success: true,
      data: storeBranch
    });
  } catch (error) {
    console.error('Error fetching store branch:', error);
    
    if (error.message === 'Store branch not found') {
      return res.status(404).json({
        success: false,
        error: 'Store branch not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch store branch'
    });
  }
});

// Create a new store branch
app.post('/api/store-branches', async (req, res) => {
  try {
    const { store_name, store_address, store_phone } = req.body;
    
    // Validate required fields
    if (!store_name || !store_address) {
      return res.status(400).json({
        success: false,
        error: 'Store name and address are required'
      });
    }
    
    const newStoreBranch = await StoreBranch.create({
      store_name,
      store_address,
      store_phone
    });
    
    res.status(201).json({
      success: true,
      data: newStoreBranch
    });
  } catch (error) {
    console.error('Error creating store branch:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create store branch'
    });
  }
});

// Update a store branch
app.put('/api/store-branches/:storeId', async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const { store_name, store_address, store_phone } = req.body;
    
    // Validate required fields
    if (!store_name || !store_address) {
      return res.status(400).json({
        success: false,
        error: 'Store name and address are required'
      });
    }
    
    const updatedStoreBranch = await StoreBranch.update(storeId, {
      store_name,
      store_address,
      store_phone
    });
    
    res.json({
      success: true,
      data: updatedStoreBranch
    });
  } catch (error) {
    console.error('Error updating store branch:', error);
    
    if (error.message === 'Store branch not found') {
      return res.status(404).json({
        success: false,
        error: 'Store branch not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update store branch'
    });
  }
});

// Delete a store branch
app.delete('/api/store-branches/:storeId', async (req, res) => {
  try {
    const storeId = req.params.storeId;
    
    await StoreBranch.delete(storeId);
    
    res.json({
      success: true,
      message: 'Store branch deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting store branch:', error);
    
    if (error.message === 'Store branch not found') {
      return res.status(404).json({
        success: false,
        error: 'Store branch not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to delete store branch'
    });
  }
});

// Users route
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

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
      data: {'username':username,
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

// Create user route
app.post('/api/users', async (req, res) => {
  try {
    const { username, password, firstname, lastname, email, phone, access_level } = req.body;
    
    // Validate required fields
    if (!username || !password || !firstname || !lastname || !email || !access_level) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const newUser = await User.create({
      username,
      password,
      firstname,
      lastname,
      email,
      phone,
      access_level
    });
    
    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// Update user route
app.put('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, firstname, lastname, email, phone, access_level } = req.body;
    
    // Validate required fields
    if (!username || !firstname || !lastname || !email || !access_level) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const updatedUser = await User.update(userId, {
      username,
      firstname,
      lastname,
      email,
      phone,
      access_level
    });
    
    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update user'
    });
  }
});

// Update user password route
app.put('/api/users/:userId/password', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newPassword } = req.body;

    console.log(userId, newPassword);
    
    // Validate required fields
    if (!newPassword) {
      return res.status(400).json({
        success: false,
        error: 'New password is required'
      });
    }
    
    // Validate password strength (optional)
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long'
      });
    }

    
    await User.updatePassword(userId, newPassword);
    
    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error updating password:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update password'
    });
  }
});

// Delete user route
app.delete('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    await User.delete(userId);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
