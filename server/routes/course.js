const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), courseController.createCourse);
router.get('/', authenticateToken, courseController.getAllCourses);
router.get('/:id', authenticateToken, courseController.getCourseById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), courseController.updateCourse);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), courseController.deleteCourse);

module.exports = router; 