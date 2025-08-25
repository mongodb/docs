realm.executeTransaction { r: Realm ->
    val id = ObjectId()
    val drew = TurtleEnthusiast()
    drew._id = id
    drew.name = "Drew"
    drew.age = 25
    // Add a new turtle enthusiast to the realm. Since nobody with this id
    // has been added yet, this adds the instance to the realm.
    r.insertOrUpdate(drew)
    val andy = TurtleEnthusiast()
    andy._id = id
    andy.name = "Andy"
    // Judging by the ID, it's the same turtle enthusiast, just with a different name.
    // As a result, you overwrite the original entry, renaming "Drew" to "Andy".
    r.copyToRealmOrUpdate(andy,
        ImportFlag.CHECK_SAME_VALUES_BEFORE_SET)
}
