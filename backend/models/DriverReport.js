const db = require('./db');

class DriverReport {
  static async findAll() {
    try {
      const query = `
        SELECT *
        FROM busters.tbdriverreport
        ORDER BY trans_date DESC
      `;
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error in DriverReport.findAll:', error);
      throw error;
    }
  }

  static async findById(driverReportId) {
    try {
      const query = `
        SELECT *
        FROM busters.tbdriverreport
        WHERE driverreport_id = $1
      `;
      const { rows } = await db.query(query, [driverReportId]);
      
      if (rows.length === 0) {
        throw new Error('Driver report not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('Error in DriverReport.findById:', error);
      throw error;
    }
  }

  static async findByDriverId(driverId) {
    try {
      const query = `
        SELECT *
        FROM busters.tbdriverreport
        WHERE driver_id = $1
        ORDER BY trans_date DESC
      `;
      const { rows } = await db.query(query, [driverId]);
      return rows;
    } catch (error) {
      console.error('Error in DriverReport.findByDriverId:', error);
      throw error;
    }
  }

  static async create(driverReportData) {
    try {
      const { 
        driver_id, 
        trans_date, 
        supervisor, 
        cash_amount, 
        debit_amount, 
        online_amount, 
        delivery_fee, 
        cash_due 
      } = driverReportData;
      
      const query = `
        INSERT INTO busters.tbdriverreport (
          driver_id, 
          trans_date, 
          supervisor, 
          cash_amount, 
          debit_amount, 
          online_amount, 
          delivery_fee, 
          cash_due
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      
      const values = [
        driver_id, 
        trans_date, 
        supervisor, 
        cash_amount, 
        debit_amount, 
        online_amount, 
        delivery_fee, 
        cash_due
      ];
      
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      console.error('Error in DriverReport.create:', error);
      throw error;
    }
  }

  static async update(driverReportId, driverReportData) {
    try {
      const { 
        driver_id, 
        trans_date, 
        supervisor, 
        cash_amount, 
        debit_amount, 
        online_amount, 
        delivery_fee, 
        cash_due 
      } = driverReportData;
      
      const query = `
        UPDATE busters.tbdriverreport
        SET 
          driver_id = $1, 
          trans_date = $2, 
          supervisor = $3, 
          cash_amount = $4, 
          debit_amount = $5, 
          online_amount = $6, 
          delivery_fee = $7, 
          cash_due = $8
        WHERE driverreport_id = $9
        RETURNING *
      `;
      
      const values = [
        driver_id, 
        trans_date, 
        supervisor, 
        cash_amount, 
        debit_amount, 
        online_amount, 
        delivery_fee, 
        cash_due, 
        driverReportId
      ];
      
      const { rows } = await db.query(query, values);
      
      if (rows.length === 0) {
        throw new Error('Driver report not found');
      }
      
      return rows[0];
    } catch (error) {
      console.error('Error in DriverReport.update:', error);
      throw error;
    }
  }

  static async delete(driverReportId) {
    try {
      const query = `
        DELETE FROM busters.tbdriverreport
        WHERE driverreport_id = $1
        RETURNING driverreport_id
      `;
      
      const { rows } = await db.query(query, [driverReportId]);
      
      if (rows.length === 0) {
        throw new Error('Driver report not found');
      }
      
      return true;
    } catch (error) {
      console.error('Error in DriverReport.delete:', error);
      throw error;
    }
  }
}

module.exports = DriverReport; 