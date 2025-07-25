const { Presentation, ActivityLog, Project, Panel } = require('../models');
const notify = require('../utils/notify');

exports.createPresentation = async (req, res) => {
  try {
    const { project_id, panel_id, type, scheduled_date, actual_date, venue, status, final_decision } = req.body;
    const presentation = await Presentation.create({ project_id, panel_id, type, scheduled_date, actual_date, venue, status, final_decision });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'presentation',
      target_id: presentation.id,
      description: 'Created presentation'
    });
    // Notify student
    const project = await Project.findByPk(project_id);
    if (project) {
      await notify(project.student_id, 'A new presentation has been scheduled for your project.', req.user.id);
    }
    res.status(201).json(presentation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllPresentations = async (req, res) => {
  try {
    let presentations;
    if (req.user.role === 'admin') {
      presentations = await Presentation.findAll({ include: [Project, Panel] });
    } else if (req.user.role === 'supervisor') {
      // Supervisors see presentations where they are panel members
      presentations = await Presentation.findAll({
        include: [
          Project,
          Panel,
          {
            association: 'Panel',
            include: [{ association: 'PanelMembers', where: { supervisor_id: req.user.id } }]
          }
        ]
      });
    } else {
      presentations = [];
    }
    res.json(presentations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPresentationById = async (req, res) => {
  try {
    const presentation = await Presentation.findByPk(req.params.id, { include: [Project, Panel] });
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });
    res.json(presentation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updatePresentation = async (req, res) => {
  try {
    const presentation = await Presentation.findByPk(req.params.id);
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });
    const { project_id, panel_id, type, scheduled_date, actual_date, venue, status, final_decision } = req.body;
    if (project_id) presentation.project_id = project_id;
    if (panel_id) presentation.panel_id = panel_id;
    if (type) presentation.type = type;
    if (scheduled_date) presentation.scheduled_date = scheduled_date;
    if (actual_date) presentation.actual_date = actual_date;
    if (venue) presentation.venue = venue;
    if (status) presentation.status = status;
    if (final_decision) presentation.final_decision = final_decision;
    await presentation.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'presentation',
      target_id: presentation.id,
      description: 'Updated presentation'
    });
    res.json(presentation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deletePresentation = async (req, res) => {
  try {
    const presentation = await Presentation.findByPk(req.params.id);
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });
    await presentation.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'presentation',
      target_id: presentation.id,
      description: 'Deleted presentation'
    });
    res.json({ message: 'Presentation deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 
