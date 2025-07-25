const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Notification extends Model {}

Notification.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  read_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Notification',
  tableName: 'notifications',
  timestamps: false
});

module.exports = Notification; 