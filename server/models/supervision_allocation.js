const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class SupervisionAllocation extends Model {}

SupervisionAllocation.init({
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
  supervisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'supervisors', key: 'user_id' }
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'supervision_roles', key: 'id' }
  }
}, {
  sequelize,
  modelName: 'SupervisionAllocation',
  tableName: 'supervision_allocations',
  timestamps: false
});

module.exports = SupervisionAllocation; 