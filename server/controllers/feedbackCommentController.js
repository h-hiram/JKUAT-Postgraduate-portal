const { FeedbackComment, ActivityLog, DocumentSubmission, Supervisor, ProjectPhase, Project, User, SupervisionAllocation } = require('../models');
const notify = require('../utils/notify');

exports.createFeedbackComment = async (req, res) => {
  try {
    const { submission_id, supervisor_id, phase_id, comment } = req.body;
    const feedback = await FeedbackComment.create({ submission_id, supervisor_id, phase_id, comment });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'feedback_comment',
      target_id: feedback.id,
      description: 'Created feedback comment'
    });
    // Notify document owner (student), all supervisors, and all admins
    const submission = await DocumentSubmission.findByPk(submission_id);
    let notifyUserIds = [];
    if (submission) {
      const project = await Project.findByPk(submission.project_id);
      if (project) {
        notifyUserIds.push(project.student_id);
        // Supervisors for the project
        const allocations = await SupervisionAllocation.findAll({ where: { project_id: project.id } });
        notifyUserIds.push(...allocations.map(a => a.supervisor_id));
      }
    }
    // All admins
    const admins = await User.findAll({ where: { role: 'admin' } });
    notifyUserIds.push(...admins.map(a => a.id));
    // Remove duplicates
    notifyUserIds = [...new Set(notifyUserIds)];
    await notify(notifyUserIds, 'A new feedback comment has been added.', req.user.id);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllFeedbackComments = async (req, res) => {
  try {
    let comments;
    if (req.user.role === 'supervisor') {
      comments = await FeedbackComment.findAll({ where: { supervisor_id: req.user.id }, include: [DocumentSubmission, ProjectPhase] });
    } else {
      comments = await FeedbackComment.findAll({ include: [DocumentSubmission, ProjectPhase, Supervisor] });
    }
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getFeedbackCommentById = async (req, res) => {
  try {
    const feedback = await FeedbackComment.findByPk(req.params.id, { include: [DocumentSubmission, ProjectPhase, Supervisor] });
    if (!feedback) return res.status(404).json({ message: 'Feedback comment not found' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateFeedbackComment = async (req, res) => {
  try {
    const feedback = await FeedbackComment.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback comment not found' });
    const { comment } = req.body;
    if (comment) feedback.comment = comment;
    await feedback.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'feedback_comment',
      target_id: feedback.id,
      description: 'Updated feedback comment'
    });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteFeedbackComment = async (req, res) => {
  try {
    const feedback = await FeedbackComment.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback comment not found' });
    await feedback.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'feedback_comment',
      target_id: feedback.id,
      description: 'Deleted feedback comment'
    });
    res.json({ message: 'Feedback comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 