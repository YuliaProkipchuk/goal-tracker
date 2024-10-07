const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema({

    todo: [{
        date: Date,
        tasks: [
            {
                name: {
                    type: String,
                    required: [true, 'Title is required']
                },
                isComplete: Boolean
            }
        ]
    }],
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'  // Посилання на модель користувача
    // }
})
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;