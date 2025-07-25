const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Sponsorship extends Model {}

Sponsorship.init({
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
  sponsor_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sponsor_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Sponsorship',
  tableName: 'sponsorships',
  timestamps: false
});

module.exports = Sponsorship; 