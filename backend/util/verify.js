require('dotenv').config();

const jwt = require('jsonwebtoken');
const key = process.env.HASH_SECRET;

function authToken(req, res, next){
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, key, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        // console.log(user)
        next();
    });
}
module.exports = authToken;