val queryAllFrogs = realm.query<Frog>()
val queryAllLiveFrogs = this.query<Frog>() // this: MutableRealm

// Calling 'find()' on the query returns a RealmResults collection
// Can be called on a `Realm.query()` or `MutableRealm.query()`
val allFrogs: RealmResults<Frog> = queryAllFrogs.find()
val allLiveFrogs: RealmResults<Frog> = queryAllLiveFrogs.find()

// Calling 'asFlow()' on the query returns a ResultsChange Flow
// Can ONLY be called on a `Realm.query()`
val allFrogsFlow: Flow<ResultsChange<Frog>> = queryAllFrogs.asFlow()
