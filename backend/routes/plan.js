const express = require('express');
const verifyJWT = require('../middleware/authMiddleware');
const { addSubTask, editSubTask, deleteSubTask, getSubTasks } = require('../controllers/planController');
const router = express.Router();

router.use(verifyJWT);

router.get('/', getSubTasks)
router.post('/new', addSubTask);
router.patch('/:stepId', editSubTask);
router.delete('/:stepId', deleteSubTask);

module.exports = router