const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const SALT_ROUND = 15;
const TOKEN_EXPIRE_TIME = 3600;

exports.postSignup = (req, res, next) => {
    const {
        username,
        email,
        password,
        confirmPassword
    } = req.body;

    if (username.toString().trim().length < 4) {
        return console.log("error 1");
    }

    if (password.toString().trim().length < 8) {
        return console.log('error 2');
    }

    if (password.toString().trim() !== confirmPassword.toString().trim()) {
        return console.log("error 3");
    }

    if (!email) {
        return console.log("error 4");
    }

    bcrypt.hash(password, SALT_ROUND)
        .then(hash => {
            if (!hash) {
                const error = new Error('Impossible to hash password');
                error.statusCode = 401;
                throw error;
            }

            const user = new User({
                username: username.toString(),
                email: email.toString().toLowerCase(),
                password: hash
            });

            return user.save();
        })
        .then(result => {
            if (!result) {
                const error = new Error('Impossible to save user');
                error.statusCode = 401;
                throw error;
            }

            res.status(201).json({
                success: true,
                message: 'Successfully created new user',
                user: result
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.postLogin = (req, res, next) => {
    const {
        email,
        password,
    } = req.body;

    let userRetreived;

    const SECRET_KEY = process.env.SECRET_KEY;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('No user found with this email');
                error.statusCode = 401;
                throw error;
            }

            userRetreived = user;
            return bcrypt.compare(password, user.password);
        })
        .then(success => {
            if (!success) {
                const error = new Error('Wrong Password');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign({ userId: userRetreived._id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRE_TIME });

            res.status(200).json({
                success: true,
                message: 'Successfully logged in',
               	data: {
									token: token,
									expireIn: TOKEN_EXPIRE_TIME,
								}
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
