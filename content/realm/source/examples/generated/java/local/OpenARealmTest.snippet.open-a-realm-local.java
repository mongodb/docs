RealmConfiguration config = new RealmConfiguration.Builder()
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .build();

Realm realm;
try {
    realm = Realm.getInstance(config);
    Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.getPath());
} catch (RealmFileException ex) {
    Log.v("EXAMPLE", "Error opening the realm.");
    Log.v("EXAMPLE", ex.toString());
}
