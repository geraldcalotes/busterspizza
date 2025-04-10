const bcrypt = require('bcrypt');
const db = require('../models/db');

async function verifyUser(username, plainPassword) {
  // Get the hash from database
  let retval = { user_id: -1, access_level: -1 };
  const result = await db.query(
    'SELECT user_id, username, password, access_level FROM users WHERE username = $1',
    [username]
  );
  
  if (result.rows.length === 0) {
    return retval;
  }
  
  const user = result.rows[0];
  const isValid = await bcrypt.compare(plainPassword, user.password.trim());
  console.log(user.password);
  if (!isValid) {
    return retval;
  } else {
    retval = { user_id: user.user_id, access_level: user.access_level };
  }
  
  return retval;
}

module.exports = { verifyUser }