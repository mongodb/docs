mongoCollection.count().getAsync(task -> {
    if (task.isSuccess()) {
        long count = task.get();
        Log.v("EXAMPLE",
                "successfully counted, number of documents in the collection: " +
                        count);
    } else {
        Log.e("EXAMPLE", "failed to count documents with: ", task.getError());
    }
});
