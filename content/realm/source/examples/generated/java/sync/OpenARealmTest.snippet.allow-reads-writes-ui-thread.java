SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .build();

Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(Realm realm) {
        Log.v(
                "EXAMPLE",
                "Successfully opened a realm with reads and writes allowed on the UI thread."
        );
    }
});
