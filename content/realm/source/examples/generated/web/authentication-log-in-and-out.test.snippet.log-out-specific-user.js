const userId = app.currentUser.id;
await app.allUsers[userId].logOut();
