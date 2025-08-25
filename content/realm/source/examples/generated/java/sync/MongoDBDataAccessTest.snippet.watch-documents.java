RealmEventStreamAsyncTask<Plant> watcher = mongoCollection.watchAsync();
watcher.get(result -> {
    if (result.isSuccess()) {
        Log.v("EXAMPLE", "Event type: " +
                result.get().getOperationType() + " full document: " +
                result.get().getFullDocument());
    } else {
        Log.e("EXAMPLE", "failed to subscribe to changes in the collection with : ",
                result.getError());
    }
});
Plant triffid = new Plant(
        new ObjectId(),
        "triffid",
        "low",
        "green",
        "perennial",
        "Store 47");
mongoCollection.insertOne(triffid).getAsync(task -> {
    if (task.isSuccess()) {
        BsonObjectId insertedId = task.get().getInsertedId().asObjectId();
        Log.v("EXAMPLE", "successfully inserted a document with id " + insertedId);
    } else {
        Log.e("EXAMPLE", "failed to insert document with: ", task.getError());
    }
});
