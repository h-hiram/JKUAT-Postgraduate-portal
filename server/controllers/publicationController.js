const { Publication, ActivityLog, Student, Project, User, SupervisionAllocation } = require('../models');
const path = require('path');
const notify = require('../utils/notify');

exports.createPublication = async (req, res) => {
  try {
    const { student_id, title, publication_name, published_date } = req.body;
    const file_path = req.file ? path.join('uploads', req.file.filename) : null;
    if (!file_path) return res.status(400).json({ message: 'File is required' });
    const publication = await Publication.create({ student_id, title, publication_name, file_path, published_date });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'publication',
      target_id: publication.id,
      description: 'Created publication'
    });
    // Notify student, supervisors, and admins
    let notifyUserIds = [student_id];
    // Find all projects for this student and their supervisors
    const projects = await Project.findAll({ where: { student_id } });
    for (const project of projects) {
      const allocations = await SupervisionAllocation.findAll({ where: { project_id: project.id } });
      notifyUserIds.push(...allocations.map(a => a.supervisor_id));
    }
    const admins = await User.findAll({ where: { role: 'admin' } });
    notifyUserIds.push(...admins.map(a => a.id));
    notifyUserIds = [...new Set(notifyUserIds)];
    await notify(notifyUserIds, 'A new publication has been added.', req.user.id);
    res.status(201).json(publication);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllPublications = async (req, res) => {
  try {
    let publications;
    if (req.user.role === 'student') {
      publications = await Publication.findAll({ where: { student_id: req.user.id }, include: Student });
    } else {
      publications = await Publication.findAll({ include: Student });
    }
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id, { include: Student });
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    res.json(publication);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    const { title, publication_name, published_date } = req.body;
    if (title) publication.title = title;
    if (publication_name) publication.publication_name = publication_name;
    if (published_date) publication.published_date = published_date;
    if (req.file) publication.file_path = path.join('uploads', req.file.filename);
    await publication.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'publication',
      target_id: publication.id,
      description: 'Updated publication'
    });
    // Notify student, supervisors, and admins
    let notifyUserIds = [publication.student_id];
    const projects = await Project.findAll({ where: { student_id: publication.student_id } });
    for (const project of projects) {
      const allocations = await SupervisionAllocation.findAll({ where: { project_id: project.id } });
      notifyUserIds.push(...allocations.map(a => a.supervisor_id));
    }
    const admins = await User.findAll({ where: { role: 'admin' } });
    notifyUserIds.push(...admins.map(a => a.id));
    notifyUserIds = [...new Set(notifyUserIds)];
    await notify(notifyUserIds, 'A publication has been updated.', req.user.id);
    res.json(publication);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    await publication.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'publication',
      target_id: publication.id,
      description: 'Deleted publication'
    });
    res.json({ message: 'Publication deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 