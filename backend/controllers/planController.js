const Goal = require('../models/goal');

function calculateProgress(plan) {
    if (!plan.length) return 0;
    const total = plan.length;
    const complete = plan.reduce((total, curr) => {
        if (curr.status) total++;
        return total;
    }, 0);
    return (complete / total) * 100;
}

const getSubTasks = async (req, res, next) => {
    const id = req.originalUrl.split('/')[2];
    try{
        const goal = await Goal.findById(id);
        res.status(200).json(goal.plan)
    }catch(error){
        next(error);
    }
}
const addSubTask = async (req, res, next) => {
    const id = req.originalUrl.split('/')[2];
    try {
        const goal = await Goal.findById(id)
        goal.plan.push(req.body);
        goal.completed = calculateProgress(goal.plan);
        await goal.save();

    } catch (err) {
        next(error)

    }
    res.status(200).json({ message: 'Plan added successfully' });
}

const editSubTask = async (req, res, next) => {
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
        goal.completed = calculateProgress(goal.plan);
        await goal.save();

    } catch (err) {
        next(err)

    }
    res.status(200).json({ message: 'Plan added successfully' });
}

const deleteSubTask = async (req, res, next) => {
    const id = req.originalUrl.split('/')[2];
    const stepId = req.params.stepId;
    try {
        const goal = await Goal.findById(id)
        goal.plan = goal.plan.filter(p => p._id.toString() !== stepId);
        goal.completed = calculateProgress(goal.plan);
        await goal.save();
    } catch (err) {
        next(err);
    }
    res.status(200).json({ message: 'Step was deleted successfully' });
}

module.exports = {
    addSubTask,
    editSubTask,
    deleteSubTask,
    getSubTasks
}