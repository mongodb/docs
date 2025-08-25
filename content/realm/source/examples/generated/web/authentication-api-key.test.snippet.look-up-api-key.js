const user = app.currentUser;
// List all of a user's keys
const keys = await user.apiKeys.fetchAll();
// Get a specific key by its ID
const key = await user.apiKeys.fetch(API_KEY_ID);
