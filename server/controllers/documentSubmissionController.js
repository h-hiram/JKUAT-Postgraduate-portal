const { DocumentSubmission, ActivityLog, Project, ProjectPhase, SupervisionAllocation, Supervisor, User } = require('../models');
const path = require('path');
const notify = require('../utils/notify');

exports.createDocumentSubmission = async (req, res) => {
  try {
    const { project_id, phase_id, description } = req.body;
    const file_path = req.file ? path.join('uploads', req.file.filename) : null;
    if (!file_path) return res.status(400).json({ message: 'File is required' });
    const submission = await DocumentSubmission.create({ project_id, phase_id, file_path, description });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'document_submission',
      target_id: submission.id,
      description: 'Created document submission'
    });
    // Notify supervisors and admin
    const allocations = await SupervisionAllocation.findAll({ where: { project_id } });
    const supervisorIds = allocations.map(a => a.supervisor_id);
    const admins = await User.findAll({ where: { role: 'admin' } });
    const adminIds = admins.map(a => a.id);
    await notify([...supervisorIds, ...adminIds], 'A new document has been submitted for your review.', req.user.id);
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllDocumentSubmissions = async (req, res) => {
  try {
    let submissions;
    if (req.user.role === 'student') {
      submissions = await DocumentSubmission.findAll({ include: [Project, ProjectPhase], where: { project_id: req.query.project_id } });
    } else {
      submissions = await DocumentSubmission.findAll({ include: [Project, ProjectPhase] });
    }
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getDocumentSubmissionById = async (req, res) => {
  try {
    const submission = await DocumentSubmission.findByPk(req.params.id, { include: [Project, ProjectPhase] });
    if (!submission) return res.status(404).json({ message: 'Document submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateDocumentSubmission = async (req, res) => {
  try {
    const submission = await DocumentSubmission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Document submission not found' });
    const { description } = req.body;
    if (description) submission.description = description;
    if (req.file) submission.file_path = path.join('uploads', req.file.filename);
    await submission.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'document_submission',
      target_id: submission.id,
      description: 'Updated document submission'
    });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteDocumentSubmission = async (req, res) => {
  try {
    const submission = await DocumentSubmission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Document submission not found' });
    await submission.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'document_submission',
      target_id: submission.id,
      description: 'Deleted document submission'
    });
    res.json({ message: 'Document submission deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 