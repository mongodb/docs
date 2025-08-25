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
        mongoCollection.insertOne(
                new Document("user-id-field", user.getId()).append("favoriteColor", "pink").append("_partition", "partition"))
                .getAsync(result -> {
                    if (result.isSuccess()) {
                        Log.v("EXAMPLE", "Inserted custom user data document. _id of inserted document: "
                                + result.get().getInsertedId());
                    } else {
                        Log.e("EXAMPLE", "Unable to insert custom user data. Error: " + result.getError());
                    }
                });
    } else {
        Log.e("EXAMPLE", "Failed to log in anonymously:" + it.getError().toString());
    }
});
