const { Department, ActivityLog } = require('../models');

exports.createDepartment = async (req, res) => {
  try {
    const { name, campus_id } = req.body;
    const department = await Department.create({ name, campus_id });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'department',
      target_id: department.id,
      description: 'Created department'
    });
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    const { name, campus_id } = req.body;
    if (name) department.name = name;
    if (campus_id) department.campus_id = campus_id;
    await department.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'department',
      target_id: department.id,
      description: 'Updated department'
    });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    await department.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'department',
      target_id: department.id,
      description: 'Deleted department'
    });
    res.json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 