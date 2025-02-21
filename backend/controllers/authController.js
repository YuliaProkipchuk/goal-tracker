require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const { validatePassword, validateName, validateEmail } = require('../util/validation');
const Todo = require('../models/todo');

const hash = async (pass) => {
    const hashedPassword = await bcrypt.hash(pass, 8);
    return hashedPassword;
}
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 4 * 24 * 60 * 60 * 1000
}

async function signUp(req, res, next) {
    const errors = {};
    const { username, email, password } = req.body;
    if (!validatePassword(password)) {
        errors.password = 'Password must have at least 6 characters';
    }
    if (!validateName(username)) {
        errors.username = 'Name field is required'
    }
    if (!validateEmail(email)) {
        errors.email = 'Invalid email. Ex.:test@gmail.com';
    }
    const existingUser = await User.findOne({ email: email }).exec();
    if (existingUser) errors.email = 'User with this email already exist.';

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: 'Creating an user failed due to validation errors.',
            errors,
        })
    }
    const hashedPassword = await hash(password)

    try {
        const user = new User({ username, email, password: hashedPassword, goals: [], userActivities: { totalGoals: 0, completed: 0, inProgress: 0, goalsActivities: [] } });
        await Todo.create({userId:user._id, tasks:new Map()})
        const accessToken = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '4d' })
        await user.save();
        res.cookie('jwt', refreshToken, cookieOptions)

        res.status(201).json({ accessToken })
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    const errors = {};
    if (!validateEmail(req.body.email)) {
        errors.email = 'Invalid email. Ex.:test@gmail.com';
    }
    const user = await User.findOne({ email: req.body.email }).exec();

    const comparePasswords = await bcrypt.compare(req.body.password, user.password);

    if (comparePasswords) {
        const accessToken = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '4d' })
        await user.populate('goals');
        const goalIds = user.goals.map(goal=>({id:goal._id, name:goal.name}))

        res.cookie('jwt', refreshToken, cookieOptions)

        return res.json({ accessToken, goalIds })
    }
    else errors.error = 'Invalid email or password';
    if (Object.keys(errors).length > 0) {
        return res.status(421).json({
            message: 'Authetication failed due to validation errors.',
            errors,
        })
    }

}

async function refresh(req, res, next) {
    const cookies = req.cookies;

    if (!cookies.jwt) return res.status(403).json({ message: 'Forbidden' })
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unathorized' });
        }
        try {
            const user = await User.findById(decoded.id);
            if (!user) return res.status(401).json({ message: 'Unathorized' });
            await user.populate('goals');
            const goalIds = user.goals.map(goal=>({id:goal._id, name:goal.name}))
            const accessToken = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
            return res.json({ accessToken, goalIds })
        } catch (error) {
            next(error)
        }
    })

}

async function logout(req, res) {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.status(204).json({ message: 'No content' });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    res.json({ message: 'Cookie cleared' });
}

module.exports = {
    signUp,
    login,
    refresh,
    logout
};