const express = require('express');
const userService = require('./user.service');
const { restrictToRoles } = require('../helpers');
const { ROLES } = require('../consts');

const userController = express.Router();

userController.route('/schools/:schoolId/teachers').get(getAllTeachers);

userController
  .route('/schools/:schoolId/teachers/assign')
  .post([restrictToRoles([ROLES.principal]), assignTeacher]);

userController
  .route('/schools/:schoolId/teachers/unassign')
  .post([restrictToRoles([ROLES.principal]), unassignTeacher]);

userController
  .route('/schools/:schoolId/class/:classId/students/assign')
  .post([restrictToRoles([ROLES.principal]), assignStudent]);

async function getAllTeachers(req, res) {
  try {
    const teachers = await userService.getAllTeachersFromSchool(
      req.params.schoolId,
    );

    return res.send(teachers);
  } catch (e) {
    console.error('getAllTeachers ->', e);

    return res.sendStatus(500);
  }
}

async function assignTeacher(req, res) {
  const { schoolId } = req.params;
  // could be an array of teacherIds
  const { teacherId } = req.body;

  try {
    const assignedTeacher = await userService.assignTeacherToSchool({
      schoolId,
      teacherId,
    });

    return res.send(assignedTeacher);
  } catch (e) {
    console.error('assignTeacher ->', e);

    return res.sendStatus(500);
  }
}

async function unassignTeacher(req, res) {
  const { teacherId } = req.body;

  try {
    const unassignedTeacher = await userService.unassignTeacherFromSchool({
      teacherId,
    });

    return res.send(unassignedTeacher);
  } catch (e) {
    console.error('unassignTeacher ->', e);

    return res.sendStatus(500);
  }
}

async function assignStudent(req, res) {
  // similar logic to assigning teachers

  // student unassigning also works the same way
}


module.exports = userController;
