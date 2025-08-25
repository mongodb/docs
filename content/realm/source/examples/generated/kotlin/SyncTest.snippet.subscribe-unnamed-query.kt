// Subscribe to a specific query
val realmResults = realm.query<Task>("progressMinutes >= $0", 60)
    .subscribe()

// Subscribe to all objects of a specific type
val realmQuery = realm.query<Team>()
realmQuery.subscribe()
