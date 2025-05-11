// controllers/school.controller.js
const School = require('../models/school.model');
const { validateSchool } = require('../utils/validation');
const { calculateDistance } = require('../utils/distance');

// Add a new school
// exports.addSchool = async (req, res) => {
//   try {
//     // Validate input data
//     const { error } = validateSchool(req.body);
//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation error',
//         errors: error.details.map(err => err.message)
//       });
//     }

//     const { name, address, latitude, longitude } = req.body;
    
//     // Create school in database
//     const result = await School.create({ name, address, latitude, longitude });

//     res.status(201).json({
//       success: true,
//       message: 'School added successfully',
//       data: {
//         id: result.insertId,
//         name,
//         address,
//         latitude,
//         longitude
//       }
//     });
//   } catch (error) {
//     console.error('Error adding school:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to add school',
//       error: error.message
//     });
//   }
// };

// Add multiple schools
exports.addSchool = async (req, res) => {
  try {
    // Check if the request body is an array
    const schools = Array.isArray(req.body) ? req.body : [req.body];

    const results = [];
    const errors = [];

    // Process each school
    for (const schoolData of schools) {
      try {
        // Validate input data
        const { error } = validateSchool(schoolData);
        if (error) {
          errors.push({
            school: schoolData,
            errors: error.details.map(err => err.message)
          });
          continue;
        }

        const { name, address, latitude, longitude } = schoolData;
        
        // Create school in database
        const result = await School.create({ name, address, latitude, longitude });
        
        results.push({
          id: result.insertId,
          name,
          address,
          latitude,
          longitude
        });
      } catch (error) {
        errors.push({
          school: schoolData,
          error: error.message
        });
      }
    }

    // Send response based on results
    res.status(201).json({
      success: true,
      message: 'Schools processing completed',
      successCount: results.length,
      errorCount: errors.length,
      data: {
        successful: results,
        failed: errors
      }
    });
  } catch (error) {
    console.error('Error adding schools:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process schools',
      error: error.message
    });
  }
};

// List schools sorted by proximity
exports.listSchools = async (req, res) => {
  try {
    // Get user's location
    const { latitude, longitude } = req.query;
    
    // Validate latitude and longitude
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: 'Valid latitude and longitude are required'
      });
    }

    // Get all schools
    const schools = await School.findAll();
    
    // Calculate distance for each school and sort
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });

    // Sort by distance (ascending)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve schools',
      error: error.message
    });
  }
};