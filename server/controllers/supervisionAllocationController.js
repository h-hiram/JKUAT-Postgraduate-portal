const { SupervisionAllocation, ActivityLog, Project, Supervisor, SupervisionRole } = require('../models');

exports.createSupervisionAllocation = async (req, res) => {
  try {
    const { project_id, supervisor_id, role_id } = req.body;
    const allocation = await SupervisionAllocation.create({ project_id, supervisor_id, role_id });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'supervision_allocation',
      target_id: allocation.id,
      description: 'Created supervision allocation'
    });
    res.status(201).json(allocation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllSupervisionAllocations = async (req, res) => {
  try {
    const allocations = await SupervisionAllocation.findAll({ include: [Project, Supervisor, SupervisionRole] });
    res.json(allocations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getSupervisionAllocationById = async (req, res) => {
  try {
    const allocation = await SupervisionAllocation.findByPk(req.params.id, { include: [Project, Supervisor, SupervisionRole] });
    if (!allocation) return res.status(404).json({ message: 'Supervision allocation not found' });
    res.json(allocation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateSupervisionAllocation = async (req, res) => {
  try {
    const allocation = await SupervisionAllocation.findByPk(req.params.id);
    if (!allocation) return res.status(404).json({ message: 'Supervision allocation not found' });
    const { project_id, supervisor_id, role_id } = req.body;
    if (project_id) allocation.project_id = project_id;
    if (supervisor_id) allocation.supervisor_id = supervisor_id;
    if (role_id) allocation.role_id = role_id;
    await allocation.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'supervision_allocation',
      target_id: allocation.id,
      description: 'Updated supervision allocation'
    });
    res.json(allocation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteSupervisionAllocation = async (req, res) => {
  try {
    const allocation = await SupervisionAllocation.findByPk(req.params.id);
    if (!allocation) return res.status(404).json({ message: 'Supervision allocation not found' });
    await allocation.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'supervision_allocation',
      target_id: allocation.id,
      description: 'Deleted supervision allocation'
    });
    res.json({ message: 'Supervision allocation deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 