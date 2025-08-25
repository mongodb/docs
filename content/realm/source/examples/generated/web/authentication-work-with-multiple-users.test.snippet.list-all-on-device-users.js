// Get an object with all Users, where the keys are the User IDs
for (const userId in app.allUsers) {
  const user = app.allUsers[userId];
  console.log(
    `User with id ${user.id} is ${
      user.isLoggedIn ? "logged in" : "logged out"
    }`
  );
}
