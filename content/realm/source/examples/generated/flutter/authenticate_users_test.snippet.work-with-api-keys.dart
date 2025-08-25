// Create user API key
final apiKey = await user.apiKeys.create("api-key-name");

// Get existing user API key by ID
// Returns `null` if no existing API key for the ID
final refetchedApiKey = await user.apiKeys.fetch(apiKey.id);

// Get all API keys for a user
final apiKeys = await user.apiKeys.fetchAll();

// Disable API key
await user.apiKeys.disable(apiKey.id);

// Check if API key is enabled
print(apiKey.isEnabled); // prints `false`

// Enable API key
await user.apiKeys.enable(apiKey.id);

// Delete a user API key
await user.apiKeys.delete(apiKey.id);
