const { PanelMember, ActivityLog, Panel, Supervisor } = require('../models');

exports.createPanelMember = async (req, res) => {
  try {
    const { panel_id, supervisor_id, role } = req.body;
    const member = await PanelMember.create({ panel_id, supervisor_id, role });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'panel_member',
      target_id: member.id,
      description: 'Created panel member'
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllPanelMembers = async (req, res) => {
  try {
    const members = await PanelMember.findAll({ include: [Panel, Supervisor] });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPanelMemberById = async (req, res) => {
  try {
    const member = await PanelMember.findByPk(req.params.id, { include: [Panel, Supervisor] });
    if (!member) return res.status(404).json({ message: 'Panel member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePanelMember = async (req, res) => {
  try {
    const member = await PanelMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: 'Panel member not found' });
    const { panel_id, supervisor_id, role } = req.body;
    if (panel_id) member.panel_id = panel_id;
    if (supervisor_id) member.supervisor_id = supervisor_id;
    if (role) member.role = role;
    await member.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'panel_member',
      target_id: member.id,
      description: 'Updated panel member'
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deletePanelMember = async (req, res) => {
  try {
    const member = await PanelMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: 'Panel member not found' });
    await member.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'panel_member',
      target_id: member.id,
      description: 'Deleted panel member'
    });
    res.json({ message: 'Panel member deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 