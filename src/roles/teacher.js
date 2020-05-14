const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  bio: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
