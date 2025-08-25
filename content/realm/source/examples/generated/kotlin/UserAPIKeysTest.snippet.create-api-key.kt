val user = app.currentUser!!
val provider = user.apiKeyAuth

// Create an API key for the logged-in user
val key = provider.create("apiKeyName")
