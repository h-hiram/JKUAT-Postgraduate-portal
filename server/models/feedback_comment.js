const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class FeedbackComment extends Model {}

FeedbackComment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  submission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'document_submissions', key: 'id' }
  },
  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'supervisors', key: 'user_id' }
  },
  phase_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'project_phases', key: 'id' }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  commented_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'FeedbackComment',
  tableName: 'feedback_comments',
  timestamps: false
});

module.exports = FeedbackComment; 