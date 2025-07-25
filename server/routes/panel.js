const express = require('express');
const router = express.Router();
const panelController = require('../controllers/panelController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), panelController.createPanel);
router.get('/', authenticateToken, panelController.getAllPanels);
router.get('/:id', authenticateToken, panelController.getPanelById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), panelController.updatePanel);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), panelController.deletePanel);

module.exports = router; 