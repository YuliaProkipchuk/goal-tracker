const express = require('express');
const authToken = require('../util/verify');
const Goal = require('../models/goal');
const router = express.Router();

function calculateProgress(plan) {
    if (!plan.length) return 0;
    const total = plan.length;
    const complete = plan.reduce((total, curr) => {
      if (curr.status) total++;
      return total;
    }, 0);
    return (complete / total) * 100;
}

router.post('/new', authToken, async (req, res) => {
    const id = req.originalUrl.split('/')[2];
    try {
        const goal = await Goal.findById(id)
        goal.plan.push(req.body);
        goal.completed = calculateProgress(goal.plan);
        await goal.save();

    } catch (err) {
        console.log(err);

    }
    res.status(200).json({ message: 'Plan added successfully' });
})
router.patch('/:stepId', authToken, async (req, res, next) => {
    const id = req.originalUrl.split('/')[2];
    const { stepId } = req.params;
    const { actionType } = req.body;
    try {
        const goal = await Goal.findById(id)
        goal.plan.forEach(p => {
            if (p._id.toString() === stepId) {
                if (actionType === 'edit') { 
                    p.step = req.body.step;  
                }
                else {
                    p.status = req.body.status;  

                }
            }
        })
        console.log('after editing: ', goal.plan)
        goal.completed = calculateProgress(goal.plan);
        await goal.save();

    } catch (err) {
        console.log(err);

    }
    res.status(200).json({ message: 'Plan added successfully' });
})
router.delete('/:stepId', authToken, async (req, res, next) => {
    const id = req.originalUrl.split('/')[2];
    const stepId = req.params.stepId;
    try {
        const goal = await Goal.findById(id)
        goal.plan = goal.plan.filter(p => p._id.toString() !== stepId);
        goal.completed = calculateProgress(goal.plan);
        await goal.save();
    } catch (err) {
        console.log(err);
    }
    res.status(200).json({ message: 'Step was deleted successfully' });
})
module.exports = router