// 'Realm.query()' results are always frozen
val frozenResults = realm.query<Frog>("age > $0", 50).find()

// 'MutableRealm.query()' results are live within the current write transaction
realm.write { // this: MutableRealm
    val liveResults = this.query<Frog>("age > $0", 50).find()
