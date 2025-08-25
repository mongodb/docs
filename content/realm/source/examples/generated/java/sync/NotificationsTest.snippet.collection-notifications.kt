val dogs = realm.where(Dog::class.java).findAll()
// Set up the collection notification handler.
val changeListener =
    OrderedRealmCollectionChangeListener { collection: RealmResults<Dog>?, changeSet: OrderedCollectionChangeSet ->
        // For deletions, notify the UI in reverse order if removing elements the UI
        val deletions = changeSet.deletionRanges
        for (i in deletions.indices.reversed()) {
            val range = deletions[i]
            Log.v("EXAMPLE", "${range.length} dogs deleted at ${range.startIndex}")
        }
        val insertions = changeSet.insertionRanges
        for (range in insertions) {
            Log.v("EXAMPLE", "${range.length} dogs inserted at ${range.startIndex}")
        }
        val modifications = changeSet.changeRanges
        for (range in modifications) {
            Log.v("EXAMPLE", "${range.length} dogs modified at ${range.startIndex}")
        }
    }
// Observe collection notifications.
dogs.addChangeListener(changeListener)
