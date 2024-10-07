const express = require('express');
const authToken = require('../util/verify');
const Goal = require('../models/goal');
const User = require('../models/user');
const router = express.Router();
router.get('/search', authToken, async (req, res) => {
    console.log(req.user.id, req.query);
    const id = req.user.id;
    // const user = await User.findById(id);
    const user = await User.findById(id).populate('goals');
    let goals;
    if(req.query.q!=='') goals = user.goals.filter(g=>g.name.toLowerCase().includes(req.query.q.toLowerCase()));
    else goals = user.goals;
    console.log(goals); 
     
    res.status(200).json({goals})

})
router.get('/:id', authToken, async (req, res, next) => {
    const goal = await Goal.findById(req.params.id)
    res.status(200).json(goal)
})
router.post('/new', authToken, async (req, res, next) => {
    const { name, description, type } = req.body;
    const id = req.user.id
    const goal = new Goal({ name, description, type, create_date: new Date(), image: '', completed:0 });
    await goal.save();
    await User.findByIdAndUpdate(id, { $push: { goals: goal } });

    res.status(201).json(goal);
});
router.delete('/:id', authToken, async(req, res, next)=>{
    const user = await User.findById(req.user.id);
    user.goals=user.goals.filter(g=>g._id.toString()!==req.params.id)
    console.log(user.goals);
    const goals = await Goal.findByIdAndDelete(req.params.id);
    console.log(goals);
    await user.save()
    res.status(200).json({m:'ok'});
})

module.exports = router