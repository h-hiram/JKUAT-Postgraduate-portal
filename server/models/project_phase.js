const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class ProjectPhase extends Model {}

ProjectPhase.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sequence_order: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ProjectPhase',
  tableName: 'project_phases',
  timestamps: false
});

module.exports = ProjectPhase; 