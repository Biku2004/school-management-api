// utils/distance.js
/**
 * Calculate the distance between two points using the Haversine formula
 * @param {number} lat1 - Latitude of first point (in degrees)
 * @param {number} lon1 - Longitude of first point (in degrees)
 * @param {number} lat2 - Latitude of second point (in degrees)
 * @param {number} lon2 - Longitude of second point (in degrees)
 * @returns {number} Distance in kilometers
 */
exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Convert degrees to radians
  const toRad = (value) => (value * Math.PI) / 180;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  
  return distance;
};