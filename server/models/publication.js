const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Publication extends Model {}

Publication.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'students', key: 'user_id' }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publication_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  published_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Publication',
  tableName: 'publications',
  timestamps: false
});

module.exports = Publication; 