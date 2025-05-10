// models/school.model.js
const db = require('../config/db.config');

class School {
  // Create a new school
  static async create(schoolData) {
    const { name, address, latitude, longitude } = schoolData;
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, address, latitude, longitude]);
    return result;
  }

  // Find all schools
  static async findAll() {
    const query = 'SELECT * FROM schools';
    const [rows] = await db.execute(query);
    return rows;
  }

  // Find school by ID
  static async findById(id) {
    const query = 'SELECT * FROM schools WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }
}

module.exports = School;