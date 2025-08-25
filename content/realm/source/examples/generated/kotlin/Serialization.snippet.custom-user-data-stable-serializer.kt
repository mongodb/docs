val user = app.currentUser!!
val customUserData = user.customDataAsBsonDocument()

assertEquals(BsonString("blue"), customUserData?.get("favoriteColor"))
