const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class PresentationFeedback extends Model {}

PresentationFeedback.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  presentation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'presentations', key: 'id' }
  },
  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'supervisors', key: 'user_id' }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  commented_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'PresentationFeedback',
  tableName: 'presentation_feedback',
  timestamps: false
});

module.exports = PresentationFeedback; 