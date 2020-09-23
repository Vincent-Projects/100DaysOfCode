const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    try {
        const SECRET_KEY = process.env.SECRET_KEY;
        decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error('Error with Authentication');
        error.statusCode = 401;
        throw error;
    }

    console.log(decodedToken.userId);
    req.userId = decodedToken.userId;
    next();
}