// flow.collect() is blocking -- run it in a background context
val job = CoroutineScope(Dispatchers.Default).launch {
    // create a Flow from the Item collection, then add a listener to the Flow
    val itemsFlow = items.asFlow()
    itemsFlow.collect { changes: ResultsChange<Item> ->
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
