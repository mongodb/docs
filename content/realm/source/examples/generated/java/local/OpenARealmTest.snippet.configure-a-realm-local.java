RealmConfiguration config = new RealmConfiguration.Builder()
        .name("alternate-realm")
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .compactOnLaunch()
        .build();

Realm realm = Realm.getInstance(config);
Log.v("EXAMPLE", "Successfully opened a realm at: " + realm.getPath());
