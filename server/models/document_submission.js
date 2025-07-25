const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class DocumentSubmission extends Model {}

DocumentSubmission.init({
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
  file_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  upload_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'DocumentSubmission',
  tableName: 'document_submissions',
  timestamps: false
});

module.exports = DocumentSubmission; 