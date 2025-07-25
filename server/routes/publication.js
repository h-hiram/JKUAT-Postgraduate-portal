const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', authenticateToken, authorizeRoles('student', 'admin'), upload.single('file'), publicationController.createPublication);
router.get('/', authenticateToken, publicationController.getAllPublications);
router.get('/:id', authenticateToken, publicationController.getPublicationById);
router.put('/:id', authenticateToken, authorizeRoles('student', 'admin'), upload.single('file'), publicationController.updatePublication);
router.delete('/:id', authenticateToken, authorizeRoles('student', 'admin'), publicationController.deletePublication);

module.exports = router; 