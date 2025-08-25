Credentials credentials = Credentials.anonymous();
app.loginAsync(credentials, it -> {
    if (it.isSuccess()) {
        User user = app.currentUser();
        MongoClient mongoClient =
                user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
        MongoDatabase mongoDatabase =
                mongoClient.getDatabase("custom-user-data-database");
        MongoCollection<Document> mongoCollection =
                mongoDatabase.getCollection("custom-user-data-collection");
        mongoCollection.updateOne(
                new Document("user-id-field", user.getId()), new Document("favoriteColor", "cerulean"))
                .getAsync(result -> {
                    if (result.isSuccess()) {
                        if (result.get().getModifiedCount() == 1L) {
                            Log.v("EXAMPLE", "Updated custom user data document.");
                        } else {
                            Log.v("EXAMPLE", "Could not find custom user data document to update.");
                        }
                    } else {
                        Log.e("EXAMPLE", "Unable to insert custom user data. Error: " + result.getError());
                    }
                });
    } else {
        Log.e("EXAMPLE", "Failed to log in anonymously:" + it.getError().toString());
    }
});
