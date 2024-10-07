const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// export const WORDS = [
//     {
//         id: 1,
//         word: '개',
//         translation: 'собака'
//     }
// ]
// const LANGUAGES = [
//     {
//         id:'1112sdfgtggttfSS',
//         name: 'Learn Korean',
//         type: 'language',
//         create_date: new Date('2024-06-24'),
//         image: '',
//         toDo: [
//             {
//                 date: new Date('2024-07-02'),
//                 tasks:[
//                     {
//                         name: 'Learn 10 words',
//                         complete: true, 
//                     },
//                     {
//                         name: 'Read 2 texts',
//                         complete: true
//                     }
//                 ]
//             },
//             {
//                 date: new Date('2024-07-03'),
//                 tasks:[]
//             }
//         ],
//         dictionary:WORDS,
//     }
// ];
// export const GOALS = [...LANGUAGES]

// const LanguageSchema = new Schema({
//     dictionary: [
//         {
//             word: String,
//             translation: String
//         }
//     ]
// },
//     { _id: false })
// const ITSchema = new Schema({

// })
// const GeneralSchema = new Schema({

// })
const GoalSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Goal name is required!']
  },
    description: {
      type: String,
      required: [true, 'Description is required!']
  },
    type: {
      type:String,
      enum:['education', 'health', 'sport', 'travel', 'career', 'other'],
      default:'other'
    },
    create_date: Date,
    image: String,
    plan: [{
        step: String,
        status: Boolean
    }],
    
    notes: [{
      title:String,
      text:String,
      date: Date
    }],
    completed: Number
    // goal: Schema.Types.Mixed,
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'  // Посилання на модель користувача
    // }
});
// GoalSchema.pre('save', function (next) {
//     if (!this.goal) {
//       switch (this.type) {
//         case 'language':
//           this.goal = new mongoose.model('Language', LanguageSchema)().toObject();
//           break;
//         case 'it':
//           this.goal = new mongoose.model('IT', ITSchema)().toObject();
//           break;
//         case 'general':
//           this.goal = new mongoose.model('General', GeneralSchema)().toObject();
//           break;
//         default:
//           return next(new Error('Invalid goal type'));
//       }
//     }
//     next();
//   });   
const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;
exports.GoalSchema = GoalSchema;
// module.exports = {GoalSchema}; 