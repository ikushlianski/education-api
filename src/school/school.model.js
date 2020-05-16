const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
  name: String,

  // could be embedded directly, since school can have only one principal
  principal: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('School', SchoolSchema);
