const { School } = require('./school.model');

module.exports = {
  getAllSchools: async () => {
    return await School.find({});
  },
  createSchool: async (params) => {
    const newSchool = new School({ ...params });

    return await newSchool.save();
  },
};
