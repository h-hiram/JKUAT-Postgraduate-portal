const { Sponsorship, ActivityLog, User } = require('../models');
const notify = require('../utils/notify');

exports.createSponsorship = async (req, res) => {
  try {
    const { student_id, sponsor_name, sponsor_type, amount, start_date, end_date, status } = req.body;
    const sponsorship = await Sponsorship.create({ student_id, sponsor_name, sponsor_type, amount, start_date, end_date, status });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'sponsorship',
      target_id: sponsorship.id,
      description: 'Created sponsorship'
    });
    // Notify student and admins
    let notifyUserIds = [student_id];
    const admins = await User.findAll({ where: { role: 'admin' } });
    notifyUserIds.push(...admins.map(a => a.id));
    notifyUserIds = [...new Set(notifyUserIds)];
    await notify(notifyUserIds, 'A new sponsorship has been added or updated.', req.user.id);
    res.status(201).json(sponsorship);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateSponsorship = async (req, res) => {
  try {
    const sponsorship = await Sponsorship.findByPk(req.params.id);
    if (!sponsorship) return res.status(404).json({ message: 'Sponsorship not found' });
    const { sponsor_name, sponsor_type, amount, start_date, end_date, status } = req.body;
    if (sponsor_name) sponsorship.sponsor_name = sponsor_name;
    if (sponsor_type) sponsorship.sponsor_type = sponsor_type;
    if (amount) sponsorship.amount = amount;
    if (start_date) sponsorship.start_date = start_date;
    if (end_date) sponsorship.end_date = end_date;
    if (status) sponsorship.status = status;
    await sponsorship.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'sponsorship',
      target_id: sponsorship.id,
      description: 'Updated sponsorship'
    });
    // Notify student and admins
    let notifyUserIds = [sponsorship.student_id];
    const admins = await User.findAll({ where: { role: 'admin' } });
    notifyUserIds.push(...admins.map(a => a.id));
    notifyUserIds = [...new Set(notifyUserIds)];
    await notify(notifyUserIds, 'A sponsorship has been updated.', req.user.id);
    res.json(sponsorship);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 