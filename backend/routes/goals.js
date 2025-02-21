const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/authMiddleware');
const { getGoals, getGoalById, createGoal, deleteGoal } = require('../controllers/goalsController');

router.use(verifyJWT)

router.get('/search', getGoals)
router.get('/:id', getGoalById)
router.post('/new', createGoal);
router.delete('/:id', deleteGoal)

module.exports = router