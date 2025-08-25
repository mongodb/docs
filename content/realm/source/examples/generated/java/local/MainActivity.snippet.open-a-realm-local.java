String realmName = "My Project";
RealmConfiguration config = new RealmConfiguration.Builder().name(realmName).build();

Realm backgroundThreadRealm = Realm.getInstance(config);
