const db = require('./db');

class StoreBranch {
  static async findAll() {
    try {
      const query = `
        SELECT store_id, store_name, store_address, store_phone, created_at
        FROM busters.storebranch
      `;
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error in StoreBranch.findAll:', error);
      throw error;
    }
  }

  static async findById(storeId) {
    try {
      const query = `
        SELECT store_id, store_name, store_address, store_phone, created_at
        FROM busters.storebranch
        WHERE store_id = $1
      `;
      const { rows } = await db.query(query, [storeId]);
      
      if (rows.length === 0) {
        throw new Error('Store branch not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('Error in StoreBranch.findById:', error);
      throw error;
    }
  }

  static async create(storeData) {
    try {
      const { store_name, store_address, store_phone } = storeData;
      
      const query = `
        INSERT INTO busters.storebranch (store_name, store_address, store_phone)
        VALUES ($1, $2, $3)
        RETURNING store_id, store_name, store_address, store_phone, created_at
      `;
      
      const values = [store_name, store_address, store_phone];
      const { rows } = await db.query(query, values);
      
      return rows[0];
    } catch (error) {
      console.error('Error in StoreBranch.create:', error);
      throw error;
    }
  }

  static async update(storeId, storeData) {
    try {
      const { store_name, store_address, store_phone } = storeData;
      
      const query = `
        UPDATE busters.storebranch
        SET store_name = $1, store_address = $2, store_phone = $3
        WHERE store_id = $4
        RETURNING store_id, store_name, store_address, store_phone, created_at
      `;
      
      const values = [store_name, store_address, store_phone, storeId];
      const { rows } = await db.query(query, values);
      
      if (rows.length === 0) {
        throw new Error('Store branch not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('Error in StoreBranch.update:', error);
      throw error;
    }
  }

  static async delete(storeId) {
    try {
      const query = `
        DELETE FROM busters.storebranch
        WHERE store_id = $1
        RETURNING store_id
      `;
      
      const { rows } = await db.query(query, [storeId]);
      
      if (rows.length === 0) {
        throw new Error('Store branch not found');
      }
      
      return true;
    } catch (error) {
      console.error('Error in StoreBranch.delete:', error);
      throw error;
    }
  }
}

module.exports = StoreBranch; 