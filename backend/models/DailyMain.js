const db = require('./db');

class DailyMain {
  static async findAll() {
    try {
      const query = `
        SELECT *
        FROM busters.tbDailymain
      `;
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error in DailyMain.findAll:', error);
      throw error;
    }
  }

  static async findById(dailyMainId) {
    try {
      const query = `
        SELECT *
        FROM busters.tbDailymain
        WHERE dailymain_id = $1
      `;
      const { rows } = await db.query(query, [dailyMainId]);
      
      if (rows.length === 0) {
        throw new Error('Daily main record not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('Error in DailyMain.findById:', error);
      throw error;
    }
  }

  static async findByStoreId(storeId) {
    try {
      const query = `
        SELECT *
        FROM busters.tbDailymain
        WHERE store_id = $1
        ORDER BY daily_date DESC
      `;
      const { rows } = await db.query(query, [storeId]);
      return rows;
    } catch (error) {
      console.error('Error in DailyMain.findByStoreId:', error);
      throw error;
    }
  }

  static async create(dailyMainData) {
    try {
      // Extract all fields from the data
      const fields = Object.keys(dailyMainData);
      const values = Object.values(dailyMainData);
      
      // Create placeholders for the SQL query
      const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
      
      // Create the column names string
      const columns = fields.join(', ');
      
      const query = `
        INSERT INTO busters.tbDailymain (${columns})
        VALUES (${placeholders})
        RETURNING *
      `;
      
      const { rows } = await db.query(query, values);
      
      return rows[0];
    } catch (error) {
      console.error('Error in DailyMain.create:', error);
      throw error;
    }
  }

  static async update(dailyMainId, dailyMainData) {
    try {
      // Extract all fields from the data
      const fields = Object.keys(dailyMainData);
      const values = Object.values(dailyMainData);
      
      // Create the SET clause for the SQL query
      const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
      
      // Add the ID as the last parameter
      values.push(dailyMainId);
      
      const query = `
        UPDATE busters.tbDailymain
        SET ${setClause}
        WHERE dailymain_id = $${values.length}
        RETURNING *
      `;
      
      const { rows } = await db.query(query, values);
      
      if (rows.length === 0) {
        throw new Error('Daily main record not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('Error in DailyMain.update:', error);
      throw error;
    }
  }

  static async delete(dailyMainId) {
    try {
      const query = `
        DELETE FROM busters.tbDailymain
        WHERE dailymain_id = $1
        RETURNING dailymain_id
      `;
      
      const { rows } = await db.query(query, [dailyMainId]);
      
      if (rows.length === 0) {
        throw new Error('Daily main record not found');
      }
      
      return true;
    } catch (error) {
      console.error('Error in DailyMain.delete:', error);
      throw error;
    }
  }
}

module.exports = DailyMain; 