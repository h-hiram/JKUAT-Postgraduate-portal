const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class ProjectOverallProgress extends Model {}

ProjectOverallProgress.init({
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'projects', key: 'id' }
  },
  percentage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'ProjectOverallProgress',
  tableName: 'project_overall_progress',
  timestamps: false
});

module.exports = ProjectOverallProgress; 