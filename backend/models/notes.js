const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    body: String,
    date:{
        type:Date,
        default: new Date()
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note