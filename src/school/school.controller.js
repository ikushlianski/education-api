const express = require('express');
const schoolService = require('./school.service');

const schoolController = express.Router();

schoolController
  .route('/schools')
  .get(getAllSchools)
  .post([/* auth here */ createSchool]);

async function getAllSchools(req, res) {
  try {
    const schools = await schoolService.getAllSchools();

    return res.send(schools);
  } catch (e) {
    console.error('getAllSchools ->', e);

    return res.send(500);
  }
}

async function createSchool(req, res) {
  try {
    const newSchool = await schoolService.createSchool(req.body);

    return res.status(201).send(newSchool);
  } catch (e) {
    console.error('createSchool ->', e);

    // todo: classify errors and return Bad Request (not 500) for validation errors
    return res.send(500);
  }
}

module.exports = schoolController;
