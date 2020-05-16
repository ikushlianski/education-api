const express = require('express');
const userService = require('./user.service');

const userController = express.Router();

userController.route('/schools/:schoolId/teachers').get(getAllTeachers);

async function getAllTeachers(req, res) {
  try {
    const teachers = await userService.getAllTeachersFromSchool(
      req.params.schoolId,
    );

    return res.send(teachers);
  } catch (e) {
    console.error('getAllTeachers ->', e);

    return res.send(500);
  }
}

module.exports = userController;
