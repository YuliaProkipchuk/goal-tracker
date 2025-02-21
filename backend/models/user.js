const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivityDate = new Schema({
    date:Date,
    count:{
        type:Number,
        default:1
    }
})
const GoalsActivitiesSchema = new Schema({
    goalName:String,
    goalId:{
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    },
    activityDates:[ActivityDate]
},{timestamps:true})
const UserActivitiesSchema = new Schema({
    totalGoals:Number,
    completed:Number,
    inProgress:Number,
    goalsActivities:[GoalsActivitiesSchema]
})

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
    userActivities:UserActivitiesSchema
});
const User = mongoose.model('User', userSchema);
module.exports = User; 