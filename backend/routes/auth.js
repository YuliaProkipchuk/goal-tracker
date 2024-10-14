require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Todo = require('../models/todo');
const { validatePassword, validateName, validateEmail } = require('../util/validation');
const hash = async (pass) => {
    const hashedPassword = await bcrypt.hash(pass, 8);
    console.log(hashedPassword);
    return hashedPassword;
}
const key = process.env.HASH_SECRET;
router.post('/signup', async (req, res, next) => {
    const errors = {};
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!validatePassword) {
        errors.password = 'Password must have at least 6 characters';
    }
    if (!validateName) {
        errors.username = 'Name field is required'
    }
    if (!validateEmail) {
        errors.email = 'Invalid email. Ex.:test@gmail.com';
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) errors.email = 'User with this email already exist.';

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: 'Creating an user failed due to validation errors.',
            errors,
        })
    }
    const hashedPassword = await hash(password)
    const newTodo = new Todo({
        todo: [
            {
                date: new Date(),
                tasks: []
            }
        ],
    })
    try {
        const user = new User({ username, email, password: hashedPassword, goals: [], todos: newTodo._id });
        const token = jwt.sign({ id: user._id }, key, { expiresIn: '4h' })
        await newTodo.save();
        await user.save();
        res.status(201).send({ token })
    } catch (error) {
        next(err)
    }
});
router.post('/login', async (req, res) => {
    // console.log(req.body)
    const errors = {};
    if (!validateEmail) {
        errors.email = 'Invalid email. Ex.:test@gmail.com';
    }
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    console.log(req.body.password);
    
    const comparePasswords = await bcrypt.compare(req.body.password, user.password);
    // const hashedPassword = await hash('ddddddd')
    // console.log('pass ',hashedPassword); 
    
    console.log(key);
    
    if (comparePasswords) {
        const token = jwt.sign({ id: user._id }, key, { expiresIn: '4h' })
        await user.populate('goals');
        await user.populate('todos');
        console.log('yey') 
        res.send({ token })
        return user
    }
    else errors.error = 'Invalid email or password';
    if (Object.keys(errors).length > 0) {
        return res.status(421).json({
            message: 'Authetication failed due to validation errors.',
            errors,
        })
    }

})
module.exports = router;