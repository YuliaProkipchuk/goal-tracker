const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;
const ActivityDate = new Schema({
  date:Date,
  count:{
      type:Number,
      default:1
  }
}, { _id : false })
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
    description: String,
    status: {
      type: String,
      enum: ['to do', 'in progress', 'completed'],
      default: 'to do'
    },
    completed: Boolean,
    priority: { type: Number, min: 1, max: 5, default: 5 }
  }],

  completed: { type: Number, default: 0 },
  activityDates:[ActivityDate],
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
      user.totalGoals++;
      user.inProgress++;
    
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
      user.totalGoals--;
      if(this.completed<100){
        user.inProgress--;
      }else{
        user.completed--;
      }

      await user.save();
    }
    next();

  } catch (error) {
    next(error);
  }

})

const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;
