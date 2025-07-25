const { Supervisor, User, ActivityLog } = require('../models');

exports.createSupervisor = async (req, res) => {
  try {
    const { user_id, staff_number, department_id, campus_id, specialization, academic_rank, phone_number, office_location, availability_status } = req.body;
    const supervisor = await Supervisor.create({ user_id, staff_number, department_id, campus_id, specialization, academic_rank, phone_number, office_location, availability_status });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'supervisor',
      target_id: supervisor.user_id,
      description: 'Created supervisor'
    });
    res.status(201).json(supervisor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await Supervisor.findAll({ include: User });
    res.json(supervisors);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getSupervisorById = async (req, res) => {
  try {
    const supervisor = await Supervisor.findByPk(req.params.id, { include: User });
    if (!supervisor) return res.status(404).json({ message: 'Supervisor not found' });
    // Only admin or the supervisor themselves can view
    if (req.user.role !== 'admin' && req.user.id !== supervisor.user_id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(supervisor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateSupervisor = async (req, res) => {
  try {
    const supervisor = await Supervisor.findByPk(req.params.id);
    if (!supervisor) return res.status(404).json({ message: 'Supervisor not found' });
    const { staff_number, department_id, campus_id, specialization, academic_rank, phone_number, office_location, availability_status } = req.body;
    if (staff_number) supervisor.staff_number = staff_number;
    if (department_id) supervisor.department_id = department_id;
    if (campus_id) supervisor.campus_id = campus_id;
    if (specialization) supervisor.specialization = specialization;
    if (academic_rank) supervisor.academic_rank = academic_rank;
    if (phone_number) supervisor.phone_number = phone_number;
    if (office_location) supervisor.office_location = office_location;
    if (availability_status) supervisor.availability_status = availability_status;
    await supervisor.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'supervisor',
      target_id: supervisor.user_id,
      description: 'Updated supervisor'
    });
    res.json(supervisor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteSupervisor = async (req, res) => {
  try {
    const supervisor = await Supervisor.findByPk(req.params.id);
    if (!supervisor) return res.status(404).json({ message: 'Supervisor not found' });
    await supervisor.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'supervisor',
      target_id: supervisor.user_id,
      description: 'Deleted supervisor'
    });
    res.json({ message: 'Supervisor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 