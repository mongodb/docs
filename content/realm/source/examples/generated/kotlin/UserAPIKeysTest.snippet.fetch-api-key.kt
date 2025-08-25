val user = app.currentUser!!
val provider = user.apiKeyAuth

// Get all keys for the logged-in user
val apiKeys = provider.fetchAll()

// Get a specific key by its ID
val apiKey = provider.fetch(key.id)
