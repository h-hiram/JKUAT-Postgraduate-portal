const { ProjectPhaseProgress, ActivityLog, Project, User, SupervisionAllocation } = require('../models');
const notify = require('../utils/notify');

exports.createProjectPhaseProgress = async (req, res) => {
  try {
    const { project_id, phase_id, status, start_date, completion_date, supervisor_feedback } = req.body;
    const progress = await ProjectPhaseProgress.create({ project_id, phase_id, status, start_date, completion_date, supervisor_feedback });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'project_phase_progress',
      target_id: progress.id,
      description: 'Created project phase progress'
    });
    // Notify student, supervisors, and admins
    let notifyUserIds = [];
    const project = await Project.findByPk(project_id);
    if (project) {
      notifyUserIds.push(project.student_id);
      const allocations = await SupervisionAllocation.findAll({ where: { project_id } });
      notifyUserIds.push(...allocations.map(a => a.supervisor_id));
    }
    const admins = await User.findAll({ where: { role: 'admin' } });
    notifyUserIds.push(...admins.map(a => a.id));
    notifyUserIds = [...new Set(notifyUserIds)];
    await notify(notifyUserIds, 'Project phase progress has been updated.', req.user.id);
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateProjectPhaseProgress = async (req, res) => {
  try {
    const progress = await ProjectPhaseProgress.findByPk(req.params.id);
    if (!progress) return res.status(404).json({ message: 'Project phase progress not found' });
    const { status, start_date, completion_date, supervisor_feedback } = req.body;
    if (status) progress.status = status;
    if (start_date) progress.start_date = start_date;
    if (completion_date) progress.completion_date = completion_date;
    if (supervisor_feedback) progress.supervisor_feedback = supervisor_feedback;
    await progress.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'project_phase_progress',
      target_id: progress.id,
      description: 'Updated project phase progress'
    });
    // Notify student, supervisors, and admins
    let notifyUserIds = [];
    const project = await Project.findByPk(progress.project_id);
    if (project) {
      notifyUserIds.push(project.student_id);
      const allocations = await SupervisionAllocation.findAll({ where: { project_id: progress.project_id } });
      notifyUserIds.push(...allocations.map(a => a.supervisor_id));
    }
    const admins = await User.findAll({ where: { role: 'admin' } });
    notifyUserIds.push(...admins.map(a => a.id));
    notifyUserIds = [...new Set(notifyUserIds)];
    await notify(notifyUserIds, 'Project phase progress has been updated.', req.user.id);
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 