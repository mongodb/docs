// Get a list of all Users
app.allUsers.forEach((user: Realm.User) => {
  console.log(`User with id ${user.id} is ${user.isLoggedIn ? "logged in" : "logged out"}`);
});
