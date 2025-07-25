const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class PanelMember extends Model {}

PanelMember.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  panel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'panels', key: 'id' }
  },
  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'supervisors', key: 'user_id' }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'PanelMember',
  tableName: 'panel_members',
  timestamps: false
});

module.exports = PanelMember; 