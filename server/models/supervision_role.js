const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class SupervisionRole extends Model {}

SupervisionRole.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'SupervisionRole',
  tableName: 'supervision_roles',
  timestamps: false
});

module.exports = SupervisionRole; 