const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/authMiddleware');
const { getLatestTodo, getTodoByDate, createTodo, editTodo, deleteTodoTask } = require('../controllers/todoController');

router.use(verifyJWT)

router.get('/', getLatestTodo)
router.get('/:year/:mm/:dd', getTodoByDate)
router.patch('/:year/:mm/:dd/new', createTodo)
router.patch('/:year/:mm/:dd/:taskId', editTodo)
router.delete('/:year/:mm/:dd/:taskId', deleteTodoTask)

module.exports = router