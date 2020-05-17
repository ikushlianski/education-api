const express = require('express');
const schoolService = require('./school.service');
const { restrictToRoles } = require('../helpers');
const { ROLES } = require('../consts');

const schoolController = express.Router();

schoolController
  .route('/schools')
  .get(getAllSchools)
  .post([restrictToRoles([ROLES.principal]), createSchool]);

async function getAllSchools(req, res) {
  try {
    const schools = await schoolService.getAllSchools();

    return res.send(schools);
  } catch (e) {
    console.error('getAllSchools ->', e);

    return res.sendStatus(500);
  }
}

async function createSchool(req, res) {
  try {
    const newSchool = await schoolService.createSchool(req.body);

    return res.status(201).send(newSchool);
  } catch (e) {
    console.error('createSchool ->', e);

    // todo: classify errors and return Bad Request (not 500) for validation errors
    return res.sendStatus(500);
  }
}

module.exports = schoolController;
