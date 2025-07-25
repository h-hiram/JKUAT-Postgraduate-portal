const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, activityLogController.getAllActivityLogs);
router.get('/:id', authenticateToken, activityLogController.getActivityLogById);

module.exports = router; 