const express = require('express');
const router = express.Router();
const supervisionAllocationController = require('../controllers/supervisionAllocationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('admin'), supervisionAllocationController.createSupervisionAllocation);
router.get('/', authenticateToken, supervisionAllocationController.getAllSupervisionAllocations);
router.get('/:id', authenticateToken, supervisionAllocationController.getSupervisionAllocationById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), supervisionAllocationController.updateSupervisionAllocation);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), supervisionAllocationController.deleteSupervisionAllocation);

module.exports = router; 