const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Presentation extends Model {}

Presentation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'projects', key: 'id' }
  },
  panel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'panels', key: 'id' }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scheduled_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  actual_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  final_decision: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Presentation',
  tableName: 'presentations',
  timestamps: false
});

module.exports = Presentation; 