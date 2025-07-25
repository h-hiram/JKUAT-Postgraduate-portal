const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), notificationController.createNotification);
router.get('/', authenticateToken, notificationController.getAllNotifications);
router.get('/:id', authenticateToken, notificationController.getNotificationById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), notificationController.updateNotification);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), notificationController.deleteNotification);

module.exports = router; 