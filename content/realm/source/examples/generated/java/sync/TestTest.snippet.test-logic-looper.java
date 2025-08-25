testActivity.get().runOnUiThread(() -> {
    // instantiate an app connection
    String appID = YOUR_APP_ID; // replace this with your test application App ID
    App app = new App(new AppConfiguration.Builder(appID).build());

    // authenticate a user
    Credentials credentials = Credentials.anonymous();
    app.loginAsync(credentials, it -> {
        if (it.isSuccess()) {
            Log.v("EXAMPLE", "Successfully authenticated.");
            // open a synced realm
            SyncConfiguration config = new SyncConfiguration.Builder(
                    app.currentUser(),
                    getRandomPartition()) // replace this with a valid partition
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();
            Realm.getInstanceAsync(config, new Realm.Callback() {
                @Override
                public void onSuccess(@NonNull Realm realm) {
                    Log.v("EXAMPLE", "Successfully opened a realm.");
                    // read and write to realm here via transactions
                    testLatch.countDown();
                    realm.executeTransaction(new Realm.Transaction() {
                        @Override
                        public void execute(@NonNull Realm realm) {
                            realm.createObjectFromJson(Frog.class,
                                    "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\", _id: 0 }");
                        }
                    });
                    realm.close();
                }
                @Override
                public void onError(@NonNull Throwable exception) {
                    Log.e("EXAMPLE", "Failed to open the realm: " + exception.getLocalizedMessage());
                }
            });
        } else {
            Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
        }
    });
});
