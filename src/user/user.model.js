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

const User = mongoose.model('User', UserSchema);

exports.User = User;

UserSchema.pre('save', async function (next) {
  if (this.role !== ROLES.student && this.classes) {
    const err = new Error(
      'Only Users with role "Student" can belong to a Class',
    );
    err.status = 400;
    next(err);
  }

  // limit number of principals to 1
  if (this.role === ROLES.principal) {
    const count = await User.countDocuments({ role: ROLES.principal });

    if (count > 0) {
      const err = new Error('Only one Principal can exist in the system');
      err.status = 400;
      next(err);
    }
  }

  next();
});
