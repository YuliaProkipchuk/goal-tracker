const express = require('express');
const verifyJWT = require('../middleware/authMiddleware');
const { getNotes, getNoteById, createNote, editNote, deleteNote } = require('../controllers/notesController');
const router = express.Router();

router.use(verifyJWT)

router.get('/search', getNotes)
router.get('/:noteId', getNoteById)
router.post('/new', createNote)
router.patch('/:noteId',editNote)
router.delete('/:noteId', deleteNote)
module.exports = router