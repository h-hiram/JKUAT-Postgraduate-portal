const { Campus, ActivityLog } = require('../models');

exports.createCampus = async (req, res) => {
  try {
    const { name, location } = req.body;
    const campus = await Campus.create({ name, location });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'campus',
      target_id: campus.id,
      description: 'Created campus'
    });
    res.status(201).json(campus);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllCampuses = async (req, res) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getCampusById = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) return res.status(404).json({ message: 'Campus not found' });
    res.json(campus);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateCampus = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) return res.status(404).json({ message: 'Campus not found' });
    const { name, location } = req.body;
    if (name) campus.name = name;
    if (location) campus.location = location;
    await campus.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'campus',
      target_id: campus.id,
      description: 'Updated campus'
    });
    res.json(campus);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteCampus = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) return res.status(404).json({ message: 'Campus not found' });
    await campus.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'campus',
      target_id: campus.id,
      description: 'Deleted campus'
    });
    res.json({ message: 'Campus deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 