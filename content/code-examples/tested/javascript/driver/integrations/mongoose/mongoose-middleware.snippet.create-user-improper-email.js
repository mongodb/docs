const user = await User.create({
  name: 'Jess Garcia',
  email: 'jgarciaemail.com', // Intentional error: missing '@' symbol in email address
});
