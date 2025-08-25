// create an aggregation pipeline
List<Document> pipeline = Arrays.asList(
        new Document("$match",
                new Document("type",
                        new Document("$eq", "perennial"))));

// query mongodb using the pipeline
RealmResultTask<MongoCursor<Document>> aggregationTask =
        mongoCollection.aggregate(pipeline).iterator();

// handle success or failure of the query
aggregationTask.getAsync(task -> {
    if (task.isSuccess()) {
        MongoCursor<Document> results = task.get();

        // iterate over and print the results to the log
        Log.v("EXAMPLE", "successfully aggregated the plants. Results:");
        while (results.hasNext()) {
            Log.v("EXAMPLE", results.next().toString());
        }
    } else {
        Log.e("EXAMPLE", "failed to aggregate documents with: ",
                task.getError());
    }
});
