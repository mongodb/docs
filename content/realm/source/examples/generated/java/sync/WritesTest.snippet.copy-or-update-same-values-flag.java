realm.executeTransaction(r -> {
    ObjectId id = new ObjectId();
    TurtleEnthusiast drew = new TurtleEnthusiast();
    drew.set_id(id);
    drew.setName("Drew");
    drew.setAge(25);
    // Add a new turtle enthusiast to the realm. Since nobody with this id
    // has been added yet, this adds the instance to the realm.
    r.insertOrUpdate(drew);
    TurtleEnthusiast andy = new TurtleEnthusiast();
    andy.set_id(id);
    andy.setName("Andy");
    // Judging by the ID, it's the same turtle enthusiast, just with a different name.
    // As a result, you overwrite the original entry, renaming "Drew" to "Andy".
    // the flag passed ensures that we only write the updated name field to the db
    r.copyToRealmOrUpdate(andy, ImportFlag.CHECK_SAME_VALUES_BEFORE_SET);
});
