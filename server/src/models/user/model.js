import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: {unique: true}
  },
  email: {
    type: String,
    unique: true,
    index: {unique: true}
  },
  hashed_password: {
    type: String,
    default: ''
  },
  createdAt: Date,
  updatedAt: Date
});

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
  });

UserSchema.pre('save', function (next) {
  const user = this;

  const currentDate = new Date();
  if (this.isNew) {
    user.updatedAt = currentDate;
    user.createdAt = currentDate;
  } else {
    user.updatedAt = currentDate;
  }

  if (user._password === undefined) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user._password, salt, function (err, hash) {
      if (err) return next(err);
      user.hashed_password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.hashed_password);
};

const User = mongoose.model('User', UserSchema);

export default User;