Document queryFilter = new Document("color", "green");
mongoCollection.deleteOne(queryFilter).getAsync(task -> {
    if (task.isSuccess()) {
        long count = task.get().getDeletedCount();
        if (count == 1) {
            Log.v("EXAMPLE", "successfully deleted a document.");
        } else {
            Log.v("EXAMPLE", "did not delete a document.");
        }
    } else {
        Log.e("EXAMPLE", "failed to delete document with: ", task.getError());
    }
});
