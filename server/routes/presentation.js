const express = require('express');
const router = express.Router();
const presentationController = require('../controllers/presentationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), presentationController.createPresentation);
router.get('/', authenticateToken, presentationController.getAllPresentations);
router.get('/:id', authenticateToken, presentationController.getPresentationById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), presentationController.updatePresentation);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), presentationController.deletePresentation);

module.exports = router; 