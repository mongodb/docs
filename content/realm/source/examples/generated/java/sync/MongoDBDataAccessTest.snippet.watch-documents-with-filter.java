RealmEventStreamAsyncTask<Plant> watcher = mongoCollection
        .watchWithFilterAsync(new Document("fullDocument._partition", "Store 42"));
watcher.get(result -> {
    if (result.isSuccess()) {
        Log.v("EXAMPLE", "Event type: " +
                result.get().getOperationType() + " full document: " +
                result.get().getFullDocument());
    } else {
        Log.e("EXAMPLE",
                "failed to subscribe to filtered changes in the collection with : ",
                result.getError());
    }
});
List<Plant> plants  = Arrays.asList(
        new Plant(
                new ObjectId(),
                "triffid",
                "low",
                "green",
                "perennial",
                "Store 47"),
        new Plant(
                new ObjectId(),
                "venomous tentacula",
                "low",
                "brown",
                "annual",
                "Store 42"
        ));
mongoCollection.insertMany(plants).getAsync(task -> {
    if (task.isSuccess()) {
        int insertedCount = task.get().getInsertedIds().size();
        Log.v("EXAMPLE", "successfully inserted " +
                insertedCount + " documents into the collection.");
    } else {
        Log.e("EXAMPLE", "failed to insert documents with: ",
                task.getError());
    }
});
