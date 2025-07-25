/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project (admin only)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *               course_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created
 *       400:
 *         description: Validation error
 */
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { body } = require('express-validator');

router.post('/',
  authenticateToken,
  authorizeRoles('admin'),
  [
    body('student_id').isInt().withMessage('student_id must be an integer'),
    body('course_id').isInt().withMessage('course_id must be an integer'),
    body('title').notEmpty().withMessage('title is required'),
    body('status').notEmpty().withMessage('status is required')
  ],
  projectController.createProject
);
router.get('/', authenticateToken, projectController.getAllProjects);
router.get('/:id', authenticateToken, projectController.getProjectById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), projectController.updateProject);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), projectController.deleteProject);

module.exports = router; 