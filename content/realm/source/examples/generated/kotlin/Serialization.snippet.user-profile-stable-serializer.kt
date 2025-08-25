val user = app.currentUser!!
val userProfile = user.profileAsBsonDocument()

assertEquals(userProfile["email"], BsonString("my.email@example.com"))
