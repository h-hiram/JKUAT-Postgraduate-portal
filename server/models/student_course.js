const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class StudentCourse extends Model {}

StudentCourse.init({
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
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'courses', key: 'id' }
  },
  assigned_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'StudentCourse',
  tableName: 'student_courses',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['student_id', 'course_id']
    }
  ]
});

module.exports = StudentCourse; 