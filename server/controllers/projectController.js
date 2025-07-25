const { Project, ActivityLog, Student, Course } = require('../models');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { student_id, course_id, title, abstract, status, start_date, end_date } = req.body;
    const project = await Project.create({ student_id, course_id, title, abstract, status, start_date, end_date });
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'create',
      target_type: 'project',
      target_id: project.id,
      description: 'Created project'
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'student') {
      projects = await Project.findAll({ where: { student_id: req.user.id }, include: [Student, Course] });
    } else {
      projects = await Project.findAll({ include: [Student, Course] });
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: [Student, Course] });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (req.user.role === 'student' && req.user.id !== project.student_id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const { course_id, title, abstract, status, start_date, end_date } = req.body;
    if (course_id) project.course_id = course_id;
    if (title) project.title = title;
    if (abstract) project.abstract = abstract;
    if (status) project.status = status;
    if (start_date) project.start_date = start_date;
    if (end_date) project.end_date = end_date;
    await project.save();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'update',
      target_type: 'project',
      target_id: project.id,
      description: 'Updated project'
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    await project.destroy();
    await ActivityLog.create({
      actor_user_id: req.user.id,
      action_type: 'delete',
      target_type: 'project',
      target_id: project.id,
      description: 'Deleted project'
    });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 