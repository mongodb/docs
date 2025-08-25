Document queryFilter = new Document("_partition", "Store 47");
Document updateDocument = new Document("$set", new Document("_partition", "Store 51"));
mongoCollection.updateMany(queryFilter, updateDocument).getAsync(task -> {
    if (task.isSuccess()) {
        long count = task.get().getModifiedCount();
        if (count != 0) {
            Log.v("EXAMPLE", "successfully updated " + count + " documents.");
        } else {
            Log.v("EXAMPLE", "did not update any documents.");
        }
    } else {
        Log.e("EXAMPLE", "failed to update documents with: ", task.getError());
    }
});
