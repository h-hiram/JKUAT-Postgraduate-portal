const { Panel, ActivityLog } = require('../models');

exports.createPanel = async (req, res) => {
  try {
    const { name, created_at } = req.body;
    const panel = await Panel.create({ name, created_at });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'panel',
      target_id: panel.id,
      description: 'Created panel'
    });
    res.status(201).json(panel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllPanels = async (req, res) => {
  try {
    const panels = await Panel.findAll();
    res.json(panels);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPanelById = async (req, res) => {
  try {
    const panel = await Panel.findByPk(req.params.id);
    if (!panel) return res.status(404).json({ message: 'Panel not found' });
    res.json(panel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePanel = async (req, res) => {
  try {
    const panel = await Panel.findByPk(req.params.id);
    if (!panel) return res.status(404).json({ message: 'Panel not found' });
    const { name, created_at } = req.body;
    if (name) panel.name = name;
    if (created_at) panel.created_at = created_at;
    await panel.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'panel',
      target_id: panel.id,
      description: 'Updated panel'
    });
    res.json(panel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deletePanel = async (req, res) => {
  try {
    const panel = await Panel.findByPk(req.params.id);
    if (!panel) return res.status(404).json({ message: 'Panel not found' });
    await panel.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'panel',
      target_id: panel.id,
      description: 'Deleted panel'
    });
    res.json({ message: 'Panel deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 