// routes/school.routes.js
const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school.controller');

// Add a new school
router.post('/addSchool', schoolController.addSchool);

// List schools sorted by proximity
router.get('/listSchools', schoolController.listSchools);

module.exports = router;