const express = require('express');
const router = express.Router();
const feedbackCommentController = require('../controllers/feedbackCommentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('supervisor', 'admin'), feedbackCommentController.createFeedbackComment);
router.get('/', authenticateToken, feedbackCommentController.getAllFeedbackComments);
router.get('/:id', authenticateToken, feedbackCommentController.getFeedbackCommentById);
router.put('/:id', authenticateToken, authorizeRoles('supervisor', 'admin'), feedbackCommentController.updateFeedbackComment);
router.delete('/:id', authenticateToken, authorizeRoles('supervisor', 'admin'), feedbackCommentController.deleteFeedbackComment);

module.exports = router; 