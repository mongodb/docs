// all tasks in the realm
val tasks : RealmResults<Task> = realm.where<Task>().findAllAsync()

tasks.addChangeListener(OrderedRealmCollectionChangeListener<RealmResults<Task>> { collection, changeSet ->
    // process deletions in reverse order if maintaining parallel data structures so indices don't change as you iterate
    val deletions = changeSet.deletionRanges
    for (i in deletions.indices.reversed()) {
        val range = deletions[i]
        Log.v("QUICKSTART", "Deleted range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
    }

    val insertions = changeSet.insertionRanges
    for (range in insertions) {
        Log.v("QUICKSTART", "Inserted range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
    }

    val modifications = changeSet.changeRanges
    for (range in modifications) {
        Log.v("QUICKSTART", "Updated range: ${range.startIndex} to ${range.startIndex + range.length - 1}")
    }
})
