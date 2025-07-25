const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Student extends Model {}

Student.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'users', key: 'id' }
  },
  reg_no: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  campus_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  current_period_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Student',
  tableName: 'students',
  timestamps: false
});

module.exports = Student; 