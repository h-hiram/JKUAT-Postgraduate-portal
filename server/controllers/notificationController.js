const { Notification, ActivityLog, User } = require('../models');

exports.createNotification = async (req, res) => {
  try {
    const { user_id, message, read_status, sent_at } = req.body;
    const notification = await Notification.create({ user_id, message, read_status, sent_at });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'notification',
      target_id: notification.id,
      description: 'Created notification'
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    let notifications;
    if (req.user.role === 'admin') {
      notifications = await Notification.findAll({ include: User });
    } else {
      notifications = await Notification.findAll({ where: { user_id: req.user.id }, include: User });
    }
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id, { include: User });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    if (req.user.role !== 'admin' && req.user.id !== notification.user_id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    const { message, read_status } = req.body;
    if (message) notification.message = message;
    if (read_status !== undefined) notification.read_status = read_status;
    await notification.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'notification',
      target_id: notification.id,
      description: 'Updated notification'
    });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    await notification.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'notification',
      target_id: notification.id,
      description: 'Deleted notification'
    });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 