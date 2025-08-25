realm = Realm.getInstance(config);
Sample sample = realm
        .where(Sample.class).findFirst();
// save sample field in a variable
// for access on another thread
String sampleStringField =
        sample.stringField;
ExecutorService executorService =
        Executors.newFixedThreadPool(4);
executorService.execute(() -> {
    // cannot pass a realm
    // into another thread,
    // so get a new instance
    // for separate thread
    Realm threadRealm =
            Realm.getInstance(config);
    // cannot access original
    // sample on another
    // thread, use
    // sampleStringField instead
    Sample threadSample =
            threadRealm
                    .where(Sample.class)
            .equalTo("stringField",
                    sampleStringField)
                    .findFirst();
    Log.v("EXAMPLE",
            "Separate thread sample: "
            + threadSample);
});
