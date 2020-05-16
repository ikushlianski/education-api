const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    ownerSchool: {
      type: mongoose.Types.ObjectId,
      ref: 'School',
    },
    ownerTeacher: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    teachers: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
    },
  },
  {
    collection: 'classes',
  },
);

ClassSchema.pre('save', function (next) {
  // todo reduce duplication
  if (this.ownerSchool && this.ownerTeacher) {
    const err = new Error('A class can belong to either School or Teacher');
    err.status = 400;
    next(err);
  }

  if (!(this.ownerSchool || this.ownerTeacher)) {
    const err = new Error('A class must belong to either School or Teacher');
    err.status = 400;
    next(err);
  }

  if (this.teachers.length > 1 && !this.ownerSchool) {
    const err = new Error(
      'Class can have more than one Teacher only if it belongs to a School',
    );
    err.status = 400;
    next(err);
  }

  next();
});

exports.Class = mongoose.model('Class', ClassSchema);
