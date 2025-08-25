Document queryFilter  = new Document("_partition", "Store 42");
RealmResultTask<MongoCursor<Plant>> findTask = mongoCollection.find(queryFilter).iterator();
findTask.getAsync(task -> {
    if (task.isSuccess()) {
        MongoCursor<Plant> results = task.get();
        Log.v("EXAMPLE", "successfully found all plants for Store 42:");
        while (results.hasNext()) {
            Log.v("EXAMPLE", results.next().toString());
        }
    } else {
        Log.e("EXAMPLE", "failed to find documents with: ", task.getError());
    }
});
