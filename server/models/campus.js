const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Campus extends Model {}

Campus.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Campus',
  tableName: 'campuses',
  timestamps: false
});

module.exports = Campus; 