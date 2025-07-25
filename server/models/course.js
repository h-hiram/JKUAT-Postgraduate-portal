const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Course extends Model {}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'departments', key: 'id' }
  }
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: false
});

module.exports = Course; 