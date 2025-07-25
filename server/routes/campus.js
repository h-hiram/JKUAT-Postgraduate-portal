const express = require('express');
const router = express.Router();
const campusController = require('../controllers/campusController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), campusController.createCampus);
router.get('/', authenticateToken, campusController.getAllCampuses);
router.get('/:id', authenticateToken, campusController.getCampusById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), campusController.updateCampus);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), campusController.deleteCampus);

module.exports = router; 