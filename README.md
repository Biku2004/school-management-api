# School Management API

A RESTful API service for managing schools and finding nearest schools based on geographical location. Built with Node.js, Express, and MySQL, deployed on AWS Elastic Beanstalk with AWS RDS.

## Features

- Add single or multiple schools with location data
- Find schools sorted by proximity to a given location
- Secure input validation
- Distance calculation using Haversine formula
- AWS cloud deployment
- Comprehensive error handling

## Tech Stack

- Node.js & Express.js
- MySQL (AWS RDS)
- AWS Elastic Beanstalk
- Environment variables using dotenv
- Input validation using Joi
- Security middleware (Helmet)

## API Endpoints

```
BASE_url = http://school2-env.eba-dkijphs2.ap-south-1.elasticbeanstalk.com
```

### Add School(s)
```http
POST /api/addSchool
```
- Accepts single school or array of schools
- Required fields: name, address, latitude, longitude
- Returns created school(s) with IDs

### List Schools by Distance
```http
GET /api/listSchools?latitude={value}&longitude={value}
```
- Requires user's latitude and longitude as query parameters
- Returns schools sorted by distance (nearest first)
- Includes distance calculation for each school

## Installation & Local Setup

1. Clone the repository:
```bash
git clone (https://github.com/Biku2004/school-management-api.git)
cd school-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
DB_HOST=your-rds-endpoint
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=school_management
PORT=3000
```

4. Start the server:
```bash
npm start
```

## Deployment

The API is deployed using AWS services:

### AWS RDS (Database)
- MySQL 8.0
- Managed relational database service
- Automated backups and maintenance

### AWS Elastic Beanstalk (Application Server)
- Auto-scaling enabled
- Load balanced environment
- Continuous deployment support

## Testing

A comprehensive Postman collection is available for testing all endpoints:

[View Postman Collection](https://www.postman.com/spacecraft-observer-95428883/workspace/backend-assignment/collection/37887294-6628eb94-e098-4f9b-bc16-368cdb3f325c?action=share&creator=37887294)

### Example Requests

#### Add Single School
```json
{
  "name": "Cambridge School",
  "address": "123 Education St",
  "latitude": 51.5074,
  "longitude": -0.1278
}
```

#### Add Multiple Schools
```json
[
  {
    "name": "Oxford School",
    "address": "456 Learning Ave",
    "latitude": 51.7520,
    "longitude": -1.2577
  },
  {
    "name": "London Academy",
    "address": "789 Knowledge Rd",
    "latitude": 51.5074,
    "longitude": -0.1278
  }
]
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid input validation
- Database errors
- Server errors
- Missing parameters

## Security Features

- Input validation for all endpoints
- Prepared SQL statements
- HTTP security headers (Helmet)
- Environment variable protection

