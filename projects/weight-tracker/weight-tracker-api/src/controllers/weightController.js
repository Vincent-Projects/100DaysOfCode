const mongoose = require('mongoose');
const Weight = require('../models/Weight');

// GET /weight/:weightId
// Return the weight with the id of <weightId>
exports.getWeight = (req, res, next) => {
    const { weightId } = req.params;

    Weight.findOne({ _id: weightId, userId: req.userId })
        .then(result => {
            if (!result) {
                const error = new Error("Can't retreive weight");
                error.statusCode = 401;
                throw error;
            }

            res.status(200).json({
                success: true,
                message: 'Weight successfully retreived',
                weight: {
                    weight: result.weight,
                    date: result.date
                }
            })
        }).catch(err => {
            if (!err.statuCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

// POST /weight/add
// Create and save a new weight
exports.postWeight = (req, res, next) => {
    const { weight } = req.body;

    const weightObject = new Weight({
        userId: req.userId,
        weight: weight,
    });

    weightObject.save()
        .then(result => {
            if (!result) {
                const error = new Error("Can't save this weight into database");
                error.statusCode = 401;
                throw error;
            }

            res.status(201).json({
                success: true,
                message: 'Weight successfully saved',
                weight: result
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

// GET /weights/month/:month
// Return an array of weight <month> months from now in the past
exports.getMonthWeights = (req, res, next) => {
    const { month } = req.params;

    // the current date
    const today = new Date(Date.now());

    // compute the start of the month desired
    const startDate = new Date();
    startDate.setMonth(today.getMonth() - month);
    startDate.setDate(1);

    // compute the number of days in the month we want
    let daysInMonth = new Date(startDate);
    daysInMonth.setDate(0);
    daysInMonth = daysInMonth.getDate();

    // compute the end of the month desired
    const endDate = new Date();
    endDate.setMonth(today.getMonth() - month);
    endDate.setDate(daysInMonth - 1);

    Weight.find({ userId: req.userId, date: { $gte: startDate, $lte: endDate } })
        .then(weights => {
            if (!weights) {
                const error = new Error("Can't retreive weights");
                error.statusCode = 401;
                throw error;
            }

            res.status(200).json({
                success: true,
                message: 'Successfully retreive weights',
                weights: weights
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}