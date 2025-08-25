Document queryFilter = new Document("name", "petunia");
Document updateDocument = new Document("$set", new Document("sunlight", "partial"));
mongoCollection.updateOne(queryFilter, updateDocument).getAsync(task -> {
    if (task.isSuccess()) {
        long count = task.get().getModifiedCount();
        if (count == 1) {
            Log.v("EXAMPLE", "successfully updated a document.");
        } else {
            Log.v("EXAMPLE", "did not update a document.");
        }
    } else {
        Log.e("EXAMPLE", "failed to update document with: ", task.getError());
    }
});
