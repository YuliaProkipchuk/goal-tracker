const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {

    const authorizationHeader = req.headers.authorization || req.headers.Authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.userId = decoded.id;

        next();

    })
}

module.exports = verifyJWT