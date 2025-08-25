List<Plant> plants  = Arrays.asList(
        new Plant(new ObjectId(),
                "rhubarb",
                "full",
                "red",
                "perennial",
                "Store 47"),
        new Plant(new ObjectId(),
                "wisteria lilac",
                "partial",
                "purple",
                "perennial",
                "Store 42"),
        new Plant(new ObjectId(),
                "daffodil",
                "full",
                "yellow",
                "perennial",
                "Store 42"));
mongoCollection.insertMany(plants).getAsync(task -> {
    if (task.isSuccess()) {
        int insertedCount = task.get().getInsertedIds().size();
        Log.v("EXAMPLE", "successfully inserted " + insertedCount + " documents into the collection.");
    } else {
        Log.e("EXAMPLE", "failed to insert documents with: ", task.getError());
    }
});
