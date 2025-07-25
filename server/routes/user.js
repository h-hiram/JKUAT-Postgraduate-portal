const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { body } = require('express-validator');

router.post('/',
  authenticateToken,
  authorizeRoles('admin'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['admin', 'student', 'supervisor']).withMessage('Role must be admin, student, or supervisor')
  ],
  userController.createUser
);
router.get('/', authenticateToken, authorizeRoles('admin'), userController.getAllUsers);
router.get('/:id', authenticateToken, authorizeRoles('admin'), userController.getUserById);
router.put('/:id',
  authenticateToken,
  authorizeRoles('admin'),
  [
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('role').optional().isIn(['admin', 'student', 'supervisor']).withMessage('Role must be admin, student, or supervisor')
  ],
  userController.updateUser
);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router; 