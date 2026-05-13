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
