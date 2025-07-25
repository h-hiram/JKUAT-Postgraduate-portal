const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class PublicationComment extends Model {}

PublicationComment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  publication_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'publications', key: 'id' }
  },
  source_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'supervisors', key: 'user_id' }
  },
  external_name: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  external_affiliation: {
    type: DataTypes.TEXT,
    allowNull: true
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
  modelName: 'PublicationComment',
  tableName: 'publication_comments',
  timestamps: false
});

module.exports = PublicationComment; 