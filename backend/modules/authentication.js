const bcrypt = require('bcrypt');
const db = require('../models/db');

async function verifyUser(username, plainPassword) {
  // Get the hash from database
  let retval = -1;
  const result = await db.query(
    'SELECT username,password,access_level FROM users WHERE username = $1',
    [username]
  );
  
  if (result.rows.length === 0) {
    retval = -1;
    return retval;
  }
  
  const user = result.rows[0];
  const isValid = await bcrypt.compare(plainPassword, user.password.trim());
    console.log(user.password);
    if (!isValid) {
    retval = -1;
  }else{
    retval = user.access_level;
  }
  
  return retval;
}

module.exports = { verifyUser }