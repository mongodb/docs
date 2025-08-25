Realm realm = Realm.getInstance(config);

// Get an immutable copy of the realm that can be passed across threads
Realm frozenRealm = realm.freeze();
Assert.assertTrue(frozenRealm.isFrozen());

RealmResults<Frog> frogs = realm.where(Frog.class).findAll();
// You can freeze collections
RealmResults<Frog> frozenFrogs = frogs.freeze();
Assert.assertTrue(frozenFrogs.isFrozen());

// You can still read from frozen realms
RealmResults<Frog> frozenFrogs2 = frozenRealm.where(Frog.class).findAll();
Assert.assertTrue(frozenFrogs2.isFrozen());

Frog frog = frogs.first();
Assert.assertTrue(!frog.getRealm().isFrozen());

// You can freeze objects
Frog frozenFrog = frog.freeze();
Assert.assertTrue(frozenFrog.isFrozen());
// Frozen objects have a reference to a frozen realm
Assert.assertTrue(frozenFrog.getRealm().isFrozen());
