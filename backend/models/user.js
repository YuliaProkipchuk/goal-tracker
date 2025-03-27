const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    image: {
        type:String,
        default:''
    },
    goals: [{
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    }],
    totalGoals:Number,
    completed:Number,
    inProgress:Number,
});
const User = mongoose.model('User', userSchema);
module.exports = User; 