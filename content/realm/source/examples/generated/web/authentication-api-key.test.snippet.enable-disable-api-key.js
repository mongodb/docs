// Get the ID of a User API Key
const user = app.currentUser;
const apiKeys = await user.apiKeys.fetchAll();
const keyId = apiKeys[0]["_id"];

// Enable the User API Key
await user.apiKeys.enable(keyId);
// Disable the User API Key
await user.apiKeys.disable(keyId);
