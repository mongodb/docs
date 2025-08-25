// Remove the current user from the device
const user = app.currentUser;
await app.removeUser(user);

// The user is no longer the active user
// The active user is now the logged in user (if there still is one) that was
// most recently active
assert(user.id !== app.currentUser?.id)

// The removed user is no longer on the device
assert(app.allUsers.find(({ id }) => id === user.id) === undefined);
