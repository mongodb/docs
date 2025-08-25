// Write the custom user data through a call
// to the `writeCustomUserData` function
val functionResponse = user.functions
    .call<BsonDocument>("writeCustomUserData",
        mapOf("userId" to user.id, "favoriteColor" to "blue")
    )

// Refreshed custom user data contains updated
// `favoriteColor` value added in above Atlas Function call
user.refreshCustomData()
val updatedUserData = user.customDataAsBsonDocument()
