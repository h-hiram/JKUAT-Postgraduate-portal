const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Panel extends Model {}

Panel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Panel',
  tableName: 'panels',
  timestamps: true
});

module.exports = Panel; 