// query for the specific object you intend to listen to
val frodo = realm.query(Character::class, "name == 'Frodo'").first()
// flow.collect() is blocking -- run it in a background context
val job = CoroutineScope(Dispatchers.Default).launch {
    val frodoFlow = frodo.asFlow()
    frodoFlow.collect { changes: SingleQueryChange<Character> ->
        when (changes) {
            is UpdatedObject -> {
                changes.changedFields // the changed properties
                changes.obj // the object in its newest state
                changes.isFieldChanged("name") // check if a specific field changed in value
            }
            is DeletedObject -> {
                // if the object has been deleted
                changes.obj // returns null for deleted objects -- always reflects newest state
            }
            is InitialObject -> {
                // Initial event observed on a RealmObject or EmbeddedRealmObject flow.
                // It contains a reference to the starting object state.
                changes.obj
            }
            is PendingObject -> {
                // Describes the initial state where a query result does not contain any elements.
                changes.obj
            }
        }
    }
}
