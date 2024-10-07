const express = require('express');
const authToken = require('../util/verify');
const Goal = require('../models/goal');
const router = express.Router();
router.get('/search', authToken, async (req, res, next) => {
    const id = req.originalUrl.split('/')[2];
    try {
        const goal = await Goal.findById(id)
        const notes = req.query.q.trim() === '' ? goal.notes : goal.notes.filter(n => {
            if (n.title.toLowerCase().includes(req.query.q) || n.text.toLowerCase().includes(req.query.q)) return n
        })
        notes.sort((a, b) => new Date(b.date) - new Date(a.date))
        res.json({ notes })

    } catch (err) {
        console.log(err);

    }

})
router.get('/:noteId', async (req, res) => {
    const id = req.originalUrl.split('/')[2];
    const goal = await Goal.findById(id);
    const note = goal.notes.find(el => el._id.toString() === req.params.noteId);
    res.json(note);
})
router.post('/new', authToken, async (req, res) => {
    const id = req.originalUrl.split('/')[2];
    try {
        const goal = await Goal.findById(id)
        goal.notes.push({
            ...req.body,
            date: new Date()
        });
        console.log(goal.notes)
        await goal.save();

    } catch (err) {
        console.log(err);

    }
    res.status(200).json({ message: 'New Note created successfully' });
})
router.patch('/:noteId', authToken, async (req, res, next) => {
    const id = req.originalUrl.split('/')[2];
    const { noteId } = req.params
    try {
        const goal = await Goal.findById(id)
        goal.notes.forEach(n => {
            if (n._id.toString() === noteId) {
                n.title = req.body.title;
                n.text = req.body.text;
                n.date = new Date()
            }
        })
        goal.notes.sort((a, b) => new Date(b.date) - new Date(a.date))
        console.log(goal.notes)
        await goal.save();

    } catch (err) {
        console.log(err);

    }
    res.status(200).json({ message: 'New Note created successfully' });

})
router.delete('/:noteId', authToken, async (req, res, next) => {
    const id = req.originalUrl.split('/')[2];
    const { noteId } = req.params
    console.log(noteId)
    try {
        const goal = await Goal.findById(id)
        goal.notes = goal.notes.filter(n => n._id.toString() !== noteId);
        console.log(goal.notes)
        await goal.save();

    } catch (err) {
        console.log(err);

    }
    res.status(200).json({ message: 'Note deleated successfully' });
})
module.exports = router