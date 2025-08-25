val user = app.currentUser!!
val provider = user.apiKeyAuth

// ... fetch the key to delete

// Delete the specified API key
provider.delete(key.id)
