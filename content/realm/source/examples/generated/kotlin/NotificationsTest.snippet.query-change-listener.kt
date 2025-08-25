// Listen for changes on whole collection
val characters = realm.query(Character::class)

// flow.collect() is blocking -- run it in a background context
val job = CoroutineScope(Dispatchers.Default).launch {
    // create a Flow from that collection, then add a listener to the Flow
    val charactersFlow = characters.asFlow()
    val subscription = charactersFlow.collect { changes: ResultsChange<Character> ->
        when (changes) {
            // UpdatedResults means this change represents an update/insert/delete operation
            is UpdatedResults -> {
                changes.insertions // indexes of inserted objects
                changes.insertionRanges // ranges of inserted objects
                changes.changes // indexes of modified objects
                changes.changeRanges // ranges of modified objects
                changes.deletions // indexes of deleted objects
                changes.deletionRanges // ranges of deleted objects
                changes.list // the full collection of objects
            }
            else -> {
                // types other than UpdatedResults are not changes -- ignore them
            }
        }
    }
}
// Listen for changes on RealmResults
val hobbits = realm.query(Character::class, "species == 'Hobbit'")
val hobbitJob = CoroutineScope(Dispatchers.Default).launch {
    val hobbitsFlow = hobbits.asFlow()
    val hobbitsSubscription = hobbitsFlow.collect { changes: ResultsChange<Character> ->
        // ... all the same data as above
    }
}
