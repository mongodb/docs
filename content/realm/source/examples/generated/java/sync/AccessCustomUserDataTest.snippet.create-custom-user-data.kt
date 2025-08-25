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
        mongoCollection.insertOne(Document("user-id-field", user.id).append("favoriteColor", "pink").append("_partition", "partition"))
            .getAsync { result ->
                if (result.isSuccess) {
                    Log.v("EXAMPLE", "Inserted custom user data document. _id of inserted document: ${result.get().insertedId}")
                } else {
                    Log.e("EXAMPLE", "Unable to insert custom user data. Error: ${result.error}")
                }
            }
    } else {
        Log.e("EXAMPLE", "Failed to log in anonymously: ${it.error}")
    }
}
