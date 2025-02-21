const Note = require('../models/notes');


async function getNotes(req, res, next) {
    const userId = req.userId
    try {
        const data = await Note.find({ userId });
        if (data) {
            const notes = req.query.q.trim() === '' ? data : data.filter(note => {
                if (note.title.toLowerCase().includes(req.query.q) || note.body.toLowerCase().includes(req.query.q)) return note
            })
            notes.sort((a, b) => new Date(b.date) - new Date(a.date))
            res.json({ notes })
        }
        else {
            res.status(200).json({ notes: [] })
        }

    } catch (err) {
        next(err)
    }
}

async function getNoteById(req, res, next) {
    try {
        const data = await Note.findById(req.params.noteId);
        res.status(200).json({ note: data })

    } catch (err) {
        next(err)
    }
}
async function createNote(req, res, next) {
    const userId = req.userId
    try {
        await Note.create({ ...req.body, date: new Date(), userId })
        res.status(200).json({ message: 'New Note created successfully' });

    } catch (error) {
        next(error)
    }
}
async function editNote(req, res, next) {
    const { noteId } = req.params
    try {
        const note = await Note.findById(noteId);
        if (note) {
            note.title = req.body.title || note.title;
            note.body = req.body.body || note.body;
            note.date = new Date();
            await note.save();
            res.status(200).json({ note })
        } else {
            throw new Error("Note does not exist.");

        }
    } catch (error) {
        next(error)
    }
}
async function deleteNote(req, res, next) {
    const { noteId } = req.params
    try {
        await Note.findByIdAndDelete(noteId);
        res.status(200).json({ message: 'Note is deleted successfully.' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    editNote,
    deleteNote
}