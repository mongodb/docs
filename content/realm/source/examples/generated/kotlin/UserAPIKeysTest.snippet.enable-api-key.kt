val user = app.currentUser!!
val provider = user.apiKeyAuth

// ... fetch the key to enable or disable

// Enable an API key that's currently disabled
provider.enable(key.id)

// Disable an API key that's currently enabled
provider.disable(key.id)
