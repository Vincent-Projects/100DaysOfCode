const { json } = require('express');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
        const error = new Error('Error with JWT');
        error.statusCode = 401;
        return next(error);
    }

    req.userId = decodedToken.userId;
    next();
}