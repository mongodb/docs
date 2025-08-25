Document queryFilter = new Document("sunlight", "full")
        .append("type", "perennial")
        .append("color", "green")
        .append("_partition", "Store 47");
Document updateDocument = new Document("$set", new Document("name", "sweet basil"));
UpdateOptions updateOptions = new UpdateOptions().upsert(true);
mongoCollection.updateOne(queryFilter, updateDocument, updateOptions).getAsync(task -> {
    if (task.isSuccess()) {
        if(task.get().getUpsertedId() != null) {
            Log.v("EXAMPLE", "successfully upserted a document with id " +
                    task.get().getUpsertedId());
        } else {
            Log.v("EXAMPLE", "successfully updated a document.");
        }
    } else {
        Log.e("EXAMPLE", "failed to update or insert document with: ",
                task.getError());
    }
});
