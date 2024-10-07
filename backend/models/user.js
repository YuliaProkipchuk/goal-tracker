const mongoose = require('mongoose');
const { GoalSchema } = require('./goal');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function(value){
                return value.includes('@')
            },
            message:'Email must contain @'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min:[6, 'Password must have at least 6 characters']
    },
    image: String,
    goals: [{
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    }],
    todos: {
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User; 