const { ActivityLog, User } = require('../models');

exports.getAllActivityLogs = async (req, res) => {
  try {
    let logs;
    if (req.user.role === 'admin') {
      logs = await ActivityLog.findAll({ include: User });
    } else {
      logs = await ActivityLog.findAll({ where: { actor_user_id: req.user.id }, include: User });
    }
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getActivityLogById = async (req, res) => {
  try {
    const log = await ActivityLog.findByPk(req.params.id, { include: User });
    if (!log) return res.status(404).json({ message: 'Activity log not found' });
    if (req.user.role !== 'admin' && req.user.id !== log.actor_user_id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 