const express = require('express');
const authToken = require('../util/verify');
const Goal = require('../models/goal');
const User = require('../models/user');
const Todo = require('../models/todo');
const AppError = require('../util/error');
const router = express.Router();

router.get('/:id', authToken, async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            console.log('heloo');
            
            throw new AppError('Not valid id', 500)
        }
        console.log('todo', todo)
        res.json({ todo })
        
    } catch (error) {
        next(error)
    }

})
router.patch('/:id/new', authToken, async (req, res) => {
    if(!req.body.name){
        res.status(400).json({message:'Title is required'});
    }
    const td = await Todo.findById(req.params.id);
    const ind = td.todo.findIndex(t => {
        return t.date.toDateString() === new Date(req.body.date).toDateString()
    });
    if (ind !== -1) {
        td.todo[ind].tasks.push({
            name: req.body.name, isComplete: false
        })
    }
    else {
        td.todo.push({
            date: new Date(req.body.date),
            tasks: [{ name: req.body.name, isComplete: false }]
        })
    }
    await td.save();
    res.status(201).json({message:'New task added'});
})
router.patch('/:id/:taskId', async (req, res) => {
    const todoId = req.params.id;
    const taskId = req.params.taskId
    console.log(req.body)
    const td = await Todo.findById(todoId);
    if (td) {
        const task = td.todo.find(t => t.date.toDateString() === new Date(req.body.date).toDateString()).tasks.find(task => task._id.toString() === taskId);
        if (req.body.actionType === 'check') {
            task.isComplete = req.body.isComplete;
        }
        else if (req.body.actionType === 'edit') {
            task.name = req.body.name;
        }
        await td.save();
        res.send('succes');
    }
    else { res.send('not succes') };

})
router.delete('/:id/:taskId', async (req, res) => {
    console.log('req.body')
    const todoId = req.params.id;
    const taskId = req.params.taskId;
    const td = await Todo.findById(todoId);
    if (td) {
        // console.log(goal)
        const todo = td.todo.find(t => t.date.toDateString() === new Date(req.body.date).toDateString());
        todo.tasks = todo.tasks.filter(task => task._id.toString() !== taskId);
        // console.log(task)

        await td.save();
        res.send('succes');
    }
    else { res.send('not succes') };
})

module.exports = router