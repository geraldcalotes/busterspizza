const db = require('../models/db');
const DailyMain = require('../models/DailyMain');

// Function to generate random date within a range
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to generate random name
function getRandomName() {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'William', 'Mary'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  // Combine first and last name
  let fullName = `${firstName} ${lastName}`;
  
  // Limit to 15 characters
  if (fullName.length > 15) {
    fullName = fullName.substring(0, 15);
  }
  
  return fullName;
}

// Function to generate dummy data
async function seedDailyMain() {
  try {
    console.log('Starting to seed tbDailymain table...');
    
    // Get store branches to use their IDs
    const { rows: storeBranches } = await db.query('SELECT store_id FROM busters.storebranch');
    
    if (storeBranches.length === 0) {
      console.error('No store branches found. Please add store branches first.');
      process.exit(1);
    }
    
    // Generate 20 dummy records
    const dummyRecords = [];
    const startDate = new Date(2023, 0, 1); // January 1, 2023
    const endDate = new Date(2023, 11, 31); // December 31, 2023
    
    for (let i = 0; i < 20; i++) {
      const randomDate = getRandomDate(startDate, endDate);
      const randomStoreIndex = Math.floor(Math.random() * storeBranches.length);
      const storeId = storeBranches[randomStoreIndex].store_id;
      
      // Generate random values for financial fields
      const amFloat = Math.floor(Math.random() * 1000) + 100;
      const amSafe = Math.floor(Math.random() * 2000) + 500;
      const pmFloat = Math.floor(Math.random() * 1000) + 100;
      const pmSafe = Math.floor(Math.random() * 2000) + 500;
      const adjGrossSales = Math.floor(Math.random() * 10000) + 1000;
      const deliveryCharge = Math.floor(Math.random() * 500) + 50;
      const cashOut = Math.floor(Math.random() * 2000) + 200;
      const totalDailyDrawers = amFloat + amSafe + pmFloat + pmSafe;
      const instoresSales = Math.floor(Math.random() * 5000) + 500;
      const skipDishes = Math.floor(Math.random() * 1000) + 100;
      const doorDash = Math.floor(Math.random() * 800) + 80;
      const uberEats = Math.floor(Math.random() * 800) + 80;
      const debitTips = Math.floor(Math.random() * 300) + 30;
      const cashTips = Math.floor(Math.random() * 200) + 20;
      const publicDrawerDtips = Math.floor(Math.random() * 100) + 10;
      
      // Calculate difference (this is a simplified calculation)
      const difference = adjGrossSales + deliveryCharge - cashOut - totalDailyDrawers;
      
      // Generate random names for AM and PM staff
      const amName = getRandomName();
      const pmName = getRandomName();
      
      // Generate random remarks
      const remarks = [
        'All good',
        'Short on cash',
        'Busy day',
        'Slow day',
        'Staff shortage',
        'Equipment issues',
        'Customer complaints',
        'Everything smooth'
      ];
      const amRemarks = remarks[Math.floor(Math.random() * remarks.length)];
      
      // Generate daily summary
      const dailySummary = adjGrossSales + deliveryCharge + instoresSales + skipDishes + doorDash + uberEats;
      
      // Use the actual column names from the tbDailymain table
      dummyRecords.push({
        daily_date: formatDate(randomDate),
        am_float: amFloat,
        am_safe: amSafe,
        am_name: amName,
        am_remarks: amRemarks,
        pm_float: pmFloat,
        pm_safe: pmSafe,
        pm_name: pmName,
        adj_gross_sales: adjGrossSales,
        delivery_charge: deliveryCharge,
        cash_out: cashOut,
        daily_summary: dailySummary,
        total_daily_drawers: totalDailyDrawers,
        difference: difference,
        instores_sales: instoresSales,
        skip_dishes: skipDishes,
        door_dash: doorDash,
        uber_eats: uberEats,
        debit_tips: debitTips,
        cash_tips: cashTips,
        public_drawer_dtips: publicDrawerDtips,
        store_id: storeId
      });
    }
    
    // Insert records into the database
    for (const record of dummyRecords) {
      await DailyMain.create(record);
      console.log(`Created record for store ${record.store_id} on ${record.daily_date}`);
    }
    
    console.log('Successfully seeded tbDailymain table with 20 records.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tbDailymain table:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDailyMain(); 