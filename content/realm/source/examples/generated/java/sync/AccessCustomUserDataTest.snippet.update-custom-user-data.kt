val anonymousCredentials: Credentials = Credentials.anonymous()
app.loginAsync(anonymousCredentials) {
    if (it.isSuccess) {
        val user = app.currentUser()
        val mongoClient : MongoClient =
            user?.getMongoClient("mongodb-atlas")!! // service for MongoDB Atlas cluster containing custom user data
        val mongoDatabase : MongoDatabase =
            mongoClient.getDatabase("custom-user-data-database")!!
        val mongoCollection : MongoCollection<Document> =
            mongoDatabase.getCollection("custom-user-data-collection")!!
        mongoCollection.updateOne(Document("user-id-field", user.id), Document("favoriteColor", "cerulean"))
            .getAsync { result ->
                if (result.isSuccess) {
                    if (result.get().modifiedCount == 1L) {
                        Log.v("EXAMPLE", "Updated custom user data document.")
                    } else {
                        Log.v("EXAMPLE", "Could not find custom user data document to update.")
                    }
                } else {
                    Log.e("EXAMPLE", "Unable to update custom user data. Error: ${result.error}")
                }
            }
    } else {
        Log.e("EXAMPLE", "Failed to log in anonymously: ${it.error}")
    }
}
