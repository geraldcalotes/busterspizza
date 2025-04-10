const db = require('./db');
const bcrypt = require('bcrypt');

class User {
  static async findAll() {
    try {
      const query = `
        SELECT user_id, username, firstname, lastname, email, phone, access_level
        FROM busters.users
      `;
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error in User.findAll:', error);
      throw error;
    }
  }

  static async findById(userId) {
    try {
      const query = `
        SELECT user_id, username, firstname, lastname, email, phone, access_level
        FROM busters.users
        WHERE user_id = $1
      `;
      const { rows } = await db.query(query, [userId]);
      
      if (rows.length === 0) {
        throw new Error('User not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('Error in User.findById:', error);
      throw error;
    }
  }

  static async create(userData) {
    try {
      const { username, password, firstname, lastname, email, phone, access_level } = userData;
      
      // Hash the password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const query = `
        INSERT INTO busters.users (username, password, firstname, lastname, email, phone, access_level)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING user_id, username, firstname, lastname, email, phone, access_level
      `;
      
      const values = [username, hashedPassword, firstname, lastname, email, phone, access_level];
      const { rows } = await db.query(query, values);
      
      return rows[0];
    } catch (error) {
      console.error('Error in User.create:', error);
      throw error;
    }
  }

  static async update(userId, userData) {
    try {
      const { username, firstname, lastname, email, phone, access_level } = userData;
      
      const query = `
        UPDATE busters.users
        SET username = $1, firstname = $2, lastname = $3, email = $4, phone = $5, access_level = $6
        WHERE user_id = $7
        RETURNING user_id, username, firstname, lastname, email, phone, access_level
      `;
      
      const values = [username, firstname, lastname, email, phone, access_level, userId];
      const { rows } = await db.query(query, values);
      
      if (rows.length === 0) {
        throw new Error('User not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('Error in User.update:', error);
      throw error;
    }
  }

  static async updatePassword(userId, newPassword) {
    try {
      // Hash the new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      
      const query = `
        UPDATE busters.users
        SET password = $1
        WHERE user_id = $2
        RETURNING user_id
      `;
      
      const { rows } = await db.query(query, [hashedPassword, userId]);
      
      if (rows.length === 0) {
        throw new Error('User not found');
      }
      
      return true;
    } catch (error) {
      console.error('Error in User.updatePassword:', error);
      throw error;
    }
  }

  static async delete(userId) {
    try {
      const query = `
        DELETE FROM busters.users
        WHERE user_id = $1
        RETURNING user_id
      `;
      
      const { rows } = await db.query(query, [userId]);
      
      if (rows.length === 0) {
        throw new Error('User not found');
      }
      
      return true;
    } catch (error) {
      console.error('Error in User.delete:', error);
      throw error;
    }
  }
}

module.exports = User; 