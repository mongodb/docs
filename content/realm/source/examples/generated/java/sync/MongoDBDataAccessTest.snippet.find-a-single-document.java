Document queryFilter  = new Document("type", "perennial");
mongoCollection.findOne(queryFilter).getAsync(task -> {
    if (task.isSuccess()) {
        Plant result = task.get();
        Log.v("EXAMPLE", "successfully found a document: " + result);
    } else {
        Log.e("EXAMPLE", "failed to find document with: ", task.getError());
    }
});
