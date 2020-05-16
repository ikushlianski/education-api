const { User } = require('./user.model');
const { ROLES } = require('../consts');

module.exports = {
  getAllTeachersFromSchool: async (schoolId) => {
    return await User.find({
      role: ROLES.teacher,
      school: schoolId,
    });
  },
};
