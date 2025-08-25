// Update the custom data object
user.refreshCustomData()

// Now when you access the custom data, it's the
// updated data object
val updatedUserData = user.customDataAsBsonDocument()
