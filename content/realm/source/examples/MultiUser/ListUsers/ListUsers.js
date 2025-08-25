// Get a list of all Users
app.allUsers.forEach(user => {
  console.log(`User with id ${user.id} is ${user.isLoggedIn ? "logged in" : "logged out"}`);
});
