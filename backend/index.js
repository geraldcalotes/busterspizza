const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./models/db');
const { verifyUser } = require('./modules/authentication');
const StoreBranch = require('./models/StoreBranch');
const User = require('./models/User');
const DailyMain = require('./models/DailyMain');
const DriverReport = require('./models/DriverReport');

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

// Get user by ID route
app.get('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
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
  let retval = { user_id: -1, access_level: -1 };
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

    retval = await verifyUser(username, password);
    console.log(retval);
    if (retval.user_id === -1) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
  
    // Successful authentication
    res.json({
      success: true,
      data: {
        'username': username,
        'user_id': retval.user_id,
        'access_level': retval.access_level
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

// Daily Main routes
// Get all daily main records
app.get('/api/daily-main', async (req, res) => {
  try {
    const dailyMainRecords = await DailyMain.findAll();
    res.json({
      success: true,
      data: dailyMainRecords
    });
  } catch (error) {
    console.error('Error fetching daily main records:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily main records'
    });
  }
});

// Get daily main records by store ID
app.get('/api/daily-main/by-store/:store_id', async (req, res) => {
  try {
    const storeId = req.params.store_id;
    console.log(`storeId: ${storeId}`);
    const dailyMainRecords = await DailyMain.findByStoreId(storeId);
    
    res.json({
      success: true,
      data: dailyMainRecords
    });
  } catch (error) {
    console.error('Error fetching daily main records by store ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily main records'
    });
  }
});

// Get a single daily main record by ID
app.get('/api/daily-main/:dailyMainId', async (req, res) => {
  try {
    const dailyMainId = req.params.dailyMainId;
    const dailyMainRecord = await DailyMain.findById(dailyMainId);
    
    res.json({
      success: true,
      data: dailyMainRecord
    });
  } catch (error) {
    console.error('Error fetching daily main record:', error);
    
    if (error.message === 'Daily main record not found') {
      return res.status(404).json({
        success: false,
        error: 'Daily main record not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily main record'
    });
  }
});

// Create a new daily main record
app.post('/api/daily-main', async (req, res) => {
  try {
    // Validate required fields if needed
    // For example:
    // if (!req.body.store_id || !req.body.date) {
    //   return res.status(400).json({
    //     success: false,
    //     error: 'Store ID and date are required'
    //   });
    // }
    
    const newDailyMainRecord = await DailyMain.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newDailyMainRecord
    });
  } catch (error) {
    console.error('Error creating daily main record:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create daily main record'
    });
  }
});

// Update a daily main record
app.put('/api/daily-main/:dailyMainId', async (req, res) => {
  try {
    const dailyMainId = req.params.dailyMainId;
    
    // Validate required fields if needed
    // For example:
    // if (!req.body.store_id || !req.body.date) {
    //   return res.status(400).json({
    //     success: false,
    //     error: 'Store ID and date are required'
    //   });
    // }
    
    const updatedDailyMainRecord = await DailyMain.update(dailyMainId, req.body);
    
    res.json({
      success: true,
      data: updatedDailyMainRecord
    });
  } catch (error) {
    console.error('Error updating daily main record:', error);
    
    if (error.message === 'Daily main record not found') {
      return res.status(404).json({
        success: false,
        error: 'Daily main record not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update daily main record'
    });
  }
});

// Delete a daily main record
app.delete('/api/daily-main/:dailyMainId', async (req, res) => {
  try {
    const dailyMainId = req.params.dailyMainId;
    
    await DailyMain.delete(dailyMainId);
    
    res.json({
      success: true,
      message: 'Daily main record deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting daily main record:', error);
    
    if (error.message === 'Daily main record not found') {
      return res.status(404).json({
        success: false,
        error: 'Daily main record not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to delete daily main record'
    });
  }
});

// Weekly Sales Report route
app.get('/api/weekly-sales-report', async (req, res) => {
  try {
    // Get query parameters for date range
    const { startDate, endDate, storeId } = req.query;
    
    // Build the query
    let query = `
      SELECT 
        daily_date,
        daily_summary,
        total_daily_drawers,
        (debit_tips + cash_tips) as total_tips
      FROM busters.tbDailymain
      WHERE 1=1
    `;
    
    const queryParams = [];
    let paramCount = 1;
    
    // Add date range filters if provided
    if (startDate) {
      query += ` AND daily_date >= $${paramCount}`;
      queryParams.push(startDate);
      paramCount++;
    }
    
    if (endDate) {
      query += ` AND daily_date <= $${paramCount}`;
      queryParams.push(endDate);
      paramCount++;
    }
    
    // Add store filter if provided
    if (storeId) {
      query += ` AND store_id = $${paramCount}`;
      queryParams.push(storeId);
      paramCount++;
    }
    
    // Order by date
    query += ` ORDER BY daily_date DESC`;
    
    // Execute the query
    const { rows } = await db.query(query, queryParams);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching weekly sales report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weekly sales report'
    });
  }
});

// Driver Report routes
// Get all driver reports
app.get('/api/driver-reports', async (req, res) => {
  try {
    const driverReports = await DriverReport.findAll();
    res.json({
      success: true,
      data: driverReports
    });
  } catch (error) {
    console.error('Error fetching driver reports:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch driver reports'
    });
  }
});

// Get a single driver report by ID
app.get('/api/driver-reports/:driverReportId', async (req, res) => {
  try {
    const driverReportId = req.params.driverReportId;
    const driverReport = await DriverReport.findById(driverReportId);
    
    res.json({
      success: true,
      data: driverReport
    });
  } catch (error) {
    console.error('Error fetching driver report:', error);
    
    if (error.message === 'Driver report not found') {
      return res.status(404).json({
        success: false,
        error: 'Driver report not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch driver report'
    });
  }
});

// Get driver reports by driver ID
app.get('/api/driver-reports/driver/:driverId', async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const driverReports = await DriverReport.findByDriverId(driverId);
    
    res.json({
      success: true,
      data: driverReports
    });
  } catch (error) {
    console.error('Error fetching driver reports by driver ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch driver reports'
    });
  }
});

// Create a new driver report
app.post('/api/driver-reports', async (req, res) => {
  try {
    const driverReportData = req.body;
    
    // Validate required fields
    if (!driverReportData.driver_id || !driverReportData.trans_date) {
      return res.status(400).json({
        success: false,
        error: 'Driver ID and transaction date are required'
      });
    }
    
    const newDriverReport = await DriverReport.create(driverReportData);
    
    res.status(201).json({
      success: true,
      data: newDriverReport
    });
  } catch (error) {
    console.error('Error creating driver report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create driver report'
    });
  }
});

// Update a driver report
app.put('/api/driver-reports/:driverReportId', async (req, res) => {
  try {
    const driverReportId = req.params.driverReportId;
    const driverReportData = req.body;
    
    const updatedDriverReport = await DriverReport.update(driverReportId, driverReportData);
    
    res.json({
      success: true,
      data: updatedDriverReport
    });
  } catch (error) {
    console.error('Error updating driver report:', error);
    
    if (error.message === 'Driver report not found') {
      return res.status(404).json({
        success: false,
        error: 'Driver report not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update driver report'
    });
  }
});

// Delete a driver report
app.delete('/api/driver-reports/:driverReportId', async (req, res) => {
  try {
    const driverReportId = req.params.driverReportId;
    await DriverReport.delete(driverReportId);
    
    res.json({
      success: true,
      message: 'Driver report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting driver report:', error);
    
    if (error.message === 'Driver report not found') {
      return res.status(404).json({
        success: false,
        error: 'Driver report not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to delete driver report'
    });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
