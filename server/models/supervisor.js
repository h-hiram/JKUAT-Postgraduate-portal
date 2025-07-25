const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Supervisor extends Model {}

Supervisor.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'users', key: 'id' }
  },
  staff_number: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  campus_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true
  },
  academic_rank: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  office_location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  availability_status: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Supervisor',
  tableName: 'supervisors',
  timestamps: false
});

module.exports = Supervisor; 