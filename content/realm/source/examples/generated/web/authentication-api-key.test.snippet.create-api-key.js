const user = app.currentUser;
const key = await user.apiKeys.create("myApiKey");
