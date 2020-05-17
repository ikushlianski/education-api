const express = require('express');
const classService = require('./class.service');
const { restrictToRoles } = require('../helpers');
const { ROLES } = require('../consts');

const classController = express.Router();

classController
  .route('/schools/:schoolId/teachers/:teacherId/classes')
  .get(
    restrictToRoles([/* ROLES.principal, */ ROLES.teacher]),
    getAllClassesByTeacher,
  )
  .post([restrictToRoles([ROLES.teacher]), createClass]);

classController
  .route('/schools/:schoolId/teachers/:teacherId/classes/:classId')
  .delete([restrictToRoles([ROLES.teacher]), deleteClass]);

// for classes belonging to teachers instead of schools
classController
  .route('/teachers/:teacherId/classes')
  .post([restrictToRoles([ROLES.teacher]), createClass]);

async function getAllClassesByTeacher(req, res) {
  try {
    const classes = await classService.getByTeacher(req.params.teacherId);

    return res.send(classes);
  } catch (e) {
    console.error('getAllClassesByTeacher ->', e);

    return res.sendStatus(500);
  }
}

async function createClass(req, res) {
  const { schoolId, teacherId } = req.params;
  const classData = { ...req.body };

  if (!schoolId) {
    classData.ownerTeacher = teacherId;
  } else {
    classData.ownerSchool = schoolId;
  }

  try {
    const newClass = await classService.createClass(classData);

    return res.status(201).send(newClass);
  } catch (e) {
    console.error('createClass ->', e);

    return res.sendStatus(500);
  }
}

async function deleteClass(req, res) {
  try {
    const removedClass = await classService.deleteClass(req.params.classId);

    return res.status(200).send(removedClass);
  } catch (e) {
    console.error('deleteClass ->', e);

    return res.sendStatus(500);
  }
}

module.exports = classController;
