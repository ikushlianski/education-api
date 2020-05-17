const { User } = require('./user.model');
const { ROLES } = require('../consts');

module.exports = {
  getAllTeachersFromSchool: async (schoolId) => {
    return await User.find({
      role: ROLES.teacher,
      school: schoolId,
    });
  },
  assignTeacherToSchool: async ({ teacherId, schoolId }) => {
    // must also check for the existence of school with this id
    return await User.findByIdAndUpdate(
      teacherId,
      {
        $set: { school: schoolId },
      },
      { new: true },
    );
  },
  unassignTeacherFromSchool: async ({ teacherId }) => {
    return await User.findByIdAndUpdate(
      teacherId,
      {
        $set: { school: null },
      },
      { new: true },
    );
  },
};
