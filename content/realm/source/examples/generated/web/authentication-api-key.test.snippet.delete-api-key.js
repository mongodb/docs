// Get the ID of a User API Key
const user = app.currentUser;
const apiKeys = await user.apiKeys.fetchAll();
const keyId = apiKeys.find((key) => key.name === "apiKeyToDelete")._id;

// Delete the User API Key
await user.apiKeys.delete(keyId);
