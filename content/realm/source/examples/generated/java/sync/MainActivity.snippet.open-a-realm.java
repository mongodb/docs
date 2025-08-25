String partitionValue = "My Project";
SyncConfiguration config = new SyncConfiguration.Builder(
        user,
        partitionValue)
    .build();

Realm backgroundThreadRealm = Realm.getInstance(config);
