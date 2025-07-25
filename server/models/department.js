const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Department extends Model {}

Department.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  campus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'campuses', key: 'id' }
  }
}, {
  sequelize,
  modelName: 'Department',
  tableName: 'departments',
  timestamps: false
});

module.exports = Department; 