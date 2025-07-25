const express = require('express');
const router = express.Router();
const panelMemberController = require('../controllers/panelMemberController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), panelMemberController.createPanelMember);
router.get('/', authenticateToken, panelMemberController.getAllPanelMembers);
router.get('/:id', authenticateToken, panelMemberController.getPanelMemberById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), panelMemberController.updatePanelMember);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), panelMemberController.deletePanelMember);

module.exports = router; 