const express = require('express');
const verifyJWT = require('../middleware/authMiddleware');
const { addSubTask, editSubTask, deleteSubTask } = require('../controllers/planController');
const router = express.Router();

router.use(verifyJWT);

router.post('/new', addSubTask);
router.patch('/:stepId', editSubTask);
router.delete('/:stepId', deleteSubTask);

module.exports = router