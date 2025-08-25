Document queryFilter = new Document("sunlight", "full")
        .append("type", "annual");
mongoCollection.deleteMany(queryFilter).getAsync(task -> {
    if (task.isSuccess()) {
        long count = task.get().getDeletedCount();
        if (count != 0) {
            Log.v("EXAMPLE", "successfully deleted " + count + " documents.");
        } else {
            Log.v("EXAMPLE", "did not delete any documents.");
        }
    } else {
        Log.e("EXAMPLE", "failed to delete documents with: ", task.getError());
    }
});
