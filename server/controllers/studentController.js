const { Student, User, ActivityLog } = require('../models');

exports.createStudent = async (req, res) => {
  try {
    const { user_id, reg_no, department_id, campus_id, current_period_id } = req.body;
    const student = await Student.create({ user_id, reg_no, department_id, campus_id, current_period_id });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'student',
      target_id: student.user_id,
      description: 'Created student'
    });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ include: User });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: User });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    // Only admin or the student themselves can view
    if (req.user.role !== 'admin' && req.user.id !== student.user_id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    const { reg_no, department_id, campus_id, current_period_id } = req.body;
    if (reg_no) student.reg_no = reg_no;
    if (department_id) student.department_id = department_id;
    if (campus_id) student.campus_id = campus_id;
    if (current_period_id) student.current_period_id = current_period_id;
    await student.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'student',
      target_id: student.user_id,
      description: 'Updated student'
    });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    await student.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'student',
      target_id: student.user_id,
      description: 'Deleted student'
    });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 