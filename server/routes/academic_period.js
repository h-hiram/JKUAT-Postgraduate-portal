const express = require('express');
const router = express.Router();
const academicPeriodController = require('../controllers/academicPeriodController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), academicPeriodController.createAcademicPeriod);
router.get('/', authenticateToken, academicPeriodController.getAllAcademicPeriods);
router.get('/:id', authenticateToken, academicPeriodController.getAcademicPeriodById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), academicPeriodController.updateAcademicPeriod);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), academicPeriodController.deleteAcademicPeriod);

module.exports = router; 