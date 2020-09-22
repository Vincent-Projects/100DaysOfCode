const express = require('express');

const weightController = require('../controllers/weightController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();



// POST /weight/update/:weightId
// Return the weight with the id <weightId>
router.put('/weight/update/:weightId');

// GET /weight/add
// Return the weight with the id <weightId>
router.post('/weight/add', isAuth, weightController.postWeight);

// DELETE /weight/delete/:weightId
// Delete the weight with the id <weightId>
router.delete('/weight/delete/:weightId');

// GET /weights/month/:month
// Return the list of weight for <month> from now in the past
router.get('/weights/month/:month', isAuth, weightController.getMonthWeights);

// GET /weights/year/:year
// Return the list of weight for the year <year>
router.get('/weights/year/:year');

// GET /weight/:weightId
// Return the weight with the id <weightId>
router.get('/weight/:weightId', isAuth, weightController.getWeight);

module.exports = router;