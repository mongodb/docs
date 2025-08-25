realm = Realm.getInstance(config)
val sample =
    realm.where(
        Sample::class.java
    ).findFirst()
// save sample field in a
// separate variable
// for access on another thread
val sampleStringField =
    sample!!.stringField
val executorService =
    Executors.newFixedThreadPool(4)
executorService.execute {
    // cannot pass a realm
    // into another thread,
    // so get a new instance
    // for separate thread
    val threadRealm =
        Realm.getInstance(config)
    // cannot access original
    // sample on another
    // thread, use
    // sampleStringField instead
    val threadSample =
        threadRealm.where(
            Sample::class.java
        )
            .equalTo(
                "stringField",
                sampleStringField
            ).findFirst()
    Log.v(
        "EXAMPLE",
        "Separate thread sample: " +
                threadSample
    )
}
