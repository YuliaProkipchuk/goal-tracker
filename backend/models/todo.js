const mongoose = require('mongoose');
const User = require('./user');
const { formatDate } = require('../util/formatDate');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    goal: {
        id: String,
        name: String
    }
})
const TodoSchema = new Schema({
    tasks:
    {
        type: Map,
        of: [TaskSchema],
        default: {}
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})
const Todo = mongoose.model('Todo', TodoSchema);

TodoSchema.pre('save', async function (next) {
    if (this.actionType && this.goal.id) {
        try {
            const user = await User.findById(this.userId);
            const goalsActivities = user.userActivities.goalsActivities.find(goal => goal.goalId.toString() === this.goal.id.toString())
            const activityDate = goalsActivities.activityDates.find(activity => formatDate(activity.date) === formatDate(new Date()))
            if (activityDate) {
                activityDate.count++
            }
            await user.save()
            next();
        } catch (error) {
            next(error);

        }

    }
})
module.exports = Todo;