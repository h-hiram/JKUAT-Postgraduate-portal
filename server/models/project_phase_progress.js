const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class ProjectPhaseProgress extends Model {}

ProjectPhaseProgress.init({
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
  phase_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'project_phases', key: 'id' }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completion_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  supervisor_feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ProjectPhaseProgress',
  tableName: 'project_phase_progress',
  timestamps: false
});

module.exports = ProjectPhaseProgress; 