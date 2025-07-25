const { PublicationComment, ActivityLog, Publication, User, Project, SupervisionAllocation } = require('../models');
const notify = require('../utils/notify');

exports.createPublicationComment = async (req, res) => {
  try {
    const { publication_id, source_type, supervisor_id, external_name, external_affiliation, comment } = req.body;
    const pubComment = await PublicationComment.create({ publication_id, source_type, supervisor_id, external_name, external_affiliation, comment });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'publication_comment',
      target_id: pubComment.id,
      description: 'Created publication comment'
    });
    // Notify publication owner (student), all supervisors, and all admins
    let notifyUserIds = [];
    const publication = await Publication.findByPk(publication_id);
    if (publication) {
      notifyUserIds.push(publication.student_id);
      // Supervisors for all projects of this student
      const projects = await Project.findAll({ where: { student_id: publication.student_id } });
      for (const project of projects) {
        const allocations = await SupervisionAllocation.findAll({ where: { project_id: project.id } });
        notifyUserIds.push(...allocations.map(a => a.supervisor_id));
      }
    }
    const admins = await User.findAll({ where: { role: 'admin' } });
    notifyUserIds.push(...admins.map(a => a.id));
    notifyUserIds = [...new Set(notifyUserIds)];
    await notify(notifyUserIds, 'A new comment has been added to a publication.', req.user.id);
    res.status(201).json(pubComment);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 