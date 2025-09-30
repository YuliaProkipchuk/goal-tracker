const Todo = require('../models/todo');
const { formatDate } = require('../util/formatDate');

const getLatestTodo = async (req, res, next) => {
    const id = req.userId
    const date = formatDate(new Date());
    
    try {
        const todo = await Todo.findOne({ userId: id }).exec()
        const tasks = todo?.tasks.get(date) || [];
        if (!tasks) {
            return res.json({ tasks: [] })
        } else {
            return res.json({ tasks })
        }

    } catch (error) {
        next(error)
    }
} 

const getTodoByDate = async (req, res, next) => {
    const id = req.userId
    const { year, mm: month, dd: day } = req.params;
    try {
        const todo = await Todo.findOne({ userId: id }).exec()
        const date = formatDate(new Date(year, month - 1, day));
        const tasks = todo.tasks.get(date);
        if (!tasks) {
            return res.json({ tasks: [] })
        } else {
            return res.json({ tasks })
        }
    } catch (error) {
        next(error)
    }
}

const createTodo = async (req, res, next) => {
    const { year, mm: month, dd: day } = req.params;
    const {name:title, goal} = req.body;
    const id = req.userId

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        const todo = await Todo.findOne({ userId: id }).exec()

        const date = formatDate(new Date(year, month - 1, day));
        const tasks = todo.tasks.get(date) || [];

        tasks.push({ title, goal })
        todo.tasks.set(date, tasks)

        await todo.save()
        return res.status(200).json({ tasks })
    } catch (error) {
        next(error)
    }

}

const editTodo = async (req, res, next) => {
    const taskId = req.params.taskId
    const { year, mm: month, dd: day } = req.params;
    const id = req.userId

    if (!id) {
        return res.status(401).json({ message: 'Anauthorized' });
    }
    try {
        const todo = await Todo.findOne({ userId: id }).exec()

        const date = formatDate(new Date(year, month - 1, day));
        if (todo) {
            const tasks = todo.tasks.get(date) || [];
            const task = tasks.find(t => t._id.toString() === taskId)
            if (req.body.actionType === 'check') {
                task.isCompleted = req.body.isCompleted;
            }
            else if (req.body.actionType === 'edit') {
                task.title = req.body.name;
            }

            await todo.save()
            return res.status(200).json({ task })
        }
    } catch (error) {
        next(error)
    }
}

const deleteTodoTask = async (req, res, next) => {
    const taskId = req.params.taskId
    const { year, mm: month, dd: day } = req.params;
    const id = req.userId

    if (!id) {
        return res.status(401).json({ message: 'Anauthorized' });
    }
    try {
        const todo = await Todo.findOne({ userId: id }).exec()

        const date = formatDate(new Date(year, month - 1, day));
        if (todo) {
            const tasks = todo.tasks.get(date).filter(task => task._id.toString() !== taskId);
            await todo.save()
            return res.status(200).json({ tasks })

        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getLatestTodo,
    getTodoByDate,
    createTodo,
    editTodo,
    deleteTodoTask
}