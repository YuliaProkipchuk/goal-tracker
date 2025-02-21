const User = require('../models/user');

const getUserProfile = async (req, res, next) => {
    try {
        const id = req.userId
        const user = await User.findById(id);
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}
const editUserProfile = async (req, res, next) => {
    try {
        const id = req.userId
        const jsonData = JSON.parse(req.body.data);
        const user = await User.findById(id);

        user.username = jsonData.username;
        user.email = jsonData.email;
        user.image = req.file ? req.file.filename : user.image;

        user.save();
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getUserProfile,
    editUserProfile
}
