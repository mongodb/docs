// query for the specific object you intend to listen to
val fellowshipOfTheRing = realm.query(Fellowship::class, "name == 'Fellowship of the Ring'").first().find()!!
val members = fellowshipOfTheRing.members
// flow.collect() is blocking -- run it in a background context
val job = CoroutineScope(Dispatchers.Default).launch {
    val membersFlow = members.asFlow()
    membersFlow.collect { changes: ListChange<Character> ->
        when (changes) {
            is UpdatedList -> {
                changes.insertions // indexes of inserted objects
                changes.insertionRanges // ranges of inserted objects
                changes.changes // indexes of modified objects
                changes.changeRanges // ranges of modified objects
                changes.deletions // indexes of deleted objects
                changes.deletionRanges // ranges of deleted objects
                changes.list // the full collection of objects
            }
            is DeletedList -> {
                // if the list was deleted
            }
            is InitialList -> {
                // Initial event observed on a RealmList flow. It contains a reference
                // to the starting list state.
                changes.list
            }
        }
    }
}
