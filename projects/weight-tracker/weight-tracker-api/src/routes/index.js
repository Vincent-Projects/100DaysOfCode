const express = require('express');

const weightRoutes = require('./weightRoutes');
const adminRoutes = require('./admin');


const router = express.Router();

router.use('/', weightRoutes);

router.use('/users', adminRoutes);

router.use((err, req, res, next) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
});

module.exports = router;