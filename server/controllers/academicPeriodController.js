const { AcademicPeriod, ActivityLog } = require('../models');

exports.createAcademicPeriod = async (req, res) => {
  try {
    const { year, semester, start_date, end_date } = req.body;
    const period = await AcademicPeriod.create({ year, semester, start_date, end_date });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'academic_period',
      target_id: period.id,
      description: 'Created academic period'
    });
    res.status(201).json(period);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllAcademicPeriods = async (req, res) => {
  try {
    const periods = await AcademicPeriod.findAll();
    res.json(periods);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAcademicPeriodById = async (req, res) => {
  try {
    const period = await AcademicPeriod.findByPk(req.params.id);
    if (!period) return res.status(404).json({ message: 'Academic period not found' });
    res.json(period);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateAcademicPeriod = async (req, res) => {
  try {
    const period = await AcademicPeriod.findByPk(req.params.id);
    if (!period) return res.status(404).json({ message: 'Academic period not found' });
    const { year, semester, start_date, end_date } = req.body;
    if (year) period.year = year;
    if (semester) period.semester = semester;
    if (start_date) period.start_date = start_date;
    if (end_date) period.end_date = end_date;
    await period.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'academic_period',
      target_id: period.id,
      description: 'Updated academic period'
    });
    res.json(period);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteAcademicPeriod = async (req, res) => {
  try {
    const period = await AcademicPeriod.findByPk(req.params.id);
    if (!period) return res.status(404).json({ message: 'Academic period not found' });
    await period.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'academic_period',
      target_id: period.id,
      description: 'Deleted academic period'
    });
    res.json({ message: 'Academic period deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 