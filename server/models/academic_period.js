const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class AcademicPeriod extends Model {}

AcademicPeriod.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'AcademicPeriod',
  tableName: 'academic_periods',
  timestamps: false
});

module.exports = AcademicPeriod; 