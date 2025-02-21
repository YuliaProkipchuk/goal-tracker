const Goal = require('../models/goal');
const User = require('../models/user');

const getGoals = async (req, res, next) => {
    try {
        const id = req.userId;
        const user = await User.findById(id).populate('goals');
        let goals;
        if (req.query.q && req.query.q !== 'null') goals = user.goals.filter(g => g.name.toLowerCase().includes(req.query.q.toLowerCase()));
        else goals = user.goals;
        goals.sort((a, b) => b.create_date - a.create_date)
        res.status(200).json({ goals })
    } catch (error) {
        next(error)
    }

}
const getGoalById = async (req, res, next) => {
    try {
        const goal = await Goal.findById(req.params.id)

        res.status(200).json({ goal })
    } catch (error) {
        next(error)
    }

}


const createGoal = async (req, res, next) => {
    const { name, description, type, due_date } = req.body;
    const id = req.userId

    try {
        const newGoal = {
            name,
            description,
            type,
            userId: id,
            plan: []
        }
        if (due_date) {
            newGoal.due_date = due_date
        }
        const goal = new Goal(newGoal);
        await goal.save();

        res.status(201).json(goal);
    } catch (error) {
        next(error)
    }

}

const deleteGoal = async (req, res, next) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.status(204).json({ m: 'ok' });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getGoals,
    getGoalById,
    createGoal,
    deleteGoal
}