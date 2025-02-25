const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Goal name is required!']
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['education', 'health', 'sport', 'travel', 'career', 'other'],
    default: 'other'
  },
  due_date: Date,
  plan: [{
    title: String,
    completed: Boolean,
  }],

  completed: { type: Number, default: 0 },

  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

GoalSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const user = await User.findById(this.userId);

      user.goals.push(this._id)
      user.userActivities.totalGoals++;
      user.userActivities.inProgress++;
      user.userActivities.goalsActivities.push({ goalName: this.name, goalId: this._id, activityDates: [{ date: new Date(), count: 1 }] })
      await user.save()
      next();
    } catch (error) {
      next(error);
    }

  }
  else next();
})

GoalSchema.pre('findOneAndDelete', async function (next) {
  try {
    const goal = await this.model.findOne(this.getQuery());
    console.log(this, goal);

    const user = await User.findById(goal.userId);

    if (user) {
      user.goals = user.goals.filter(g => g.toString() !== goal._id.toString());


      await user.save();
    }
    next();

  } catch (error) {
    next(error);
  }

})

const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;
