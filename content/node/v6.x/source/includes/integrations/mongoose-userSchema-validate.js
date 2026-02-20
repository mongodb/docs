import mongoose from 'mongoose';
// start-validate-import
import validator from 'validator';
// end-validate-import
const {Schema, model} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true
  },
});

// start-middleware-definition
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
// end-middleware-definition

const User = model('User', userSchema);
export default User;
