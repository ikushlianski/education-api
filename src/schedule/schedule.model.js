const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  name: String,
});

exports.Schedule = mongoose.model('Schedule', ScheduleSchema);
