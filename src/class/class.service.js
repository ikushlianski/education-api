const mongoose = require('mongoose');
const { Class } = require('./class.model');

module.exports = {
  getByTeacher: async (teacherId) => {
    return await Class.find({
      $or: [
        { teachers: mongoose.Types.ObjectId(teacherId) }, // if belongs to school
        { ownerTeacher: mongoose.Types.ObjectId(teacherId) }, // if belongs to teacher
      ],
    });
  },
  createClass: async (classData) => {
    const newClass = new Class(classData);

    return await newClass.save();
  },
  deleteClass: async (classId) => {
    // todo: first, delete this class id from students' field "classes"
    return await Class.deleteOne({ _id: classId });
  },
};
