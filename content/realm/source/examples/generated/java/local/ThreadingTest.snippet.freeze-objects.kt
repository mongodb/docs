val realm = Realm.getInstance(config)

// Get an immutable copy of the realm that can be passed across threads
val frozenRealm = realm.freeze()
Assert.assertTrue(frozenRealm.isFrozen)
val frogs = realm.where(Frog::class.java).findAll()
// You can freeze collections
val frozenFrogs = frogs.freeze()
Assert.assertTrue(frozenFrogs.isFrozen)

// You can still read from frozen realms
val frozenFrogs2 =
    frozenRealm.where(Frog::class.java).findAll()
Assert.assertTrue(frozenFrogs2.isFrozen)
val frog: Frog = frogs.first()!!
Assert.assertTrue(!frog.realm.isFrozen)

// You can freeze objects
val frozenFrog: Frog = frog.freeze()
Assert.assertTrue(frozenFrog.isFrozen)
Assert.assertTrue(frozenFrog.realm.isFrozen)
