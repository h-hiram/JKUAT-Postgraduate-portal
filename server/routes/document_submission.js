const express = require('express');
const router = express.Router();
const documentSubmissionController = require('../controllers/documentSubmissionController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', authenticateToken, authorizeRoles('student', 'admin'), upload.single('file'), documentSubmissionController.createDocumentSubmission);
router.get('/', authenticateToken, documentSubmissionController.getAllDocumentSubmissions);
router.get('/:id', authenticateToken, documentSubmissionController.getDocumentSubmissionById);
router.put('/:id', authenticateToken, authorizeRoles('student', 'admin'), upload.single('file'), documentSubmissionController.updateDocumentSubmission);
router.delete('/:id', authenticateToken, authorizeRoles('student', 'admin'), documentSubmissionController.deleteDocumentSubmission);

module.exports = router; 