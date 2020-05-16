const mongoose = require('mongoose');
const { ROLES } = require('../consts');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
    enum: [ROLES.principal, ROLES.student, ROLES.teacher],
  },
  school: {
    type: mongoose.Types.ObjectId,
    ref: 'School',
  },

  // for students only
  classes: {
    type: [mongoose.Types.ObjectId],
    ref: 'Class',
  },
});

exports.User = mongoose.model('User', UserSchema);

UserSchema.pre('save', async function (next) {
  if (this.role !== ROLES.student && this.classes) {
    const err = new Error(
      'Only Users with role "Student" can belong to a Class',
    );
    err.status = 400;
    next(err);
  }

  next();
});
