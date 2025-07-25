const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), studentController.createStudent);
router.get('/', authenticateToken, authorizeRoles('admin'), studentController.getAllStudents);
router.get('/:id', authenticateToken, studentController.getStudentById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), studentController.updateStudent);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), studentController.deleteStudent);

module.exports = router; 