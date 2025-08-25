RealmConfiguration config =
        new RealmConfiguration.Builder()
        .build();

Realm realm;
realm = Realm.getInstance(config);
Log.v("EXAMPLE",
"Successfully opened a realm: "
        + realm.getPath());
