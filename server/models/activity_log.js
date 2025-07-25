const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class ActivityLog extends Model {}

ActivityLog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  actor_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  action_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  target_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  target_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'ActivityLog',
  tableName: 'activity_logs',
  timestamps: false
});

module.exports = ActivityLog; 