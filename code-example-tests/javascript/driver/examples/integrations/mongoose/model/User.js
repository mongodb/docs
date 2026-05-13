import mongoose from 'mongoose';
// :snippet-start: validate-import
import validator from 'validator';
// :snippet-end:
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true,
  },
});

// :snippet-start: middleware-definition
userSchema.pre('save', function (next) {
  const user = this;

  // Normalize email
  if (user.email) {
    user.email = user.email.trim().toLowerCase();
  }

  // Validate email format
  if (!validator.isEmail(user.email)) {
    return next(new Error('Invalid email format'));
  }

  next();
});
// :snippet-end:

const User = model('User', userSchema);
export default User;
