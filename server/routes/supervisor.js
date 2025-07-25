const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/supervisorController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), supervisorController.createSupervisor);
router.get('/', authenticateToken, authorizeRoles('admin'), supervisorController.getAllSupervisors);
router.get('/:id', authenticateToken, supervisorController.getSupervisorById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), supervisorController.updateSupervisor);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), supervisorController.deleteSupervisor);

module.exports = router; 