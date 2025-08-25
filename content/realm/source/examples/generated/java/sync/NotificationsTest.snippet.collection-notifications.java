RealmResults<Dog> dogs = realm.where(Dog.class).findAll();
// Set up the collection notification handler.
OrderedRealmCollectionChangeListener<RealmResults<Dog>> changeListener = (collection, changeSet) -> {
    // For deletions, notify the UI in reverse order if removing elements the UI
    OrderedCollectionChangeSet.Range[] deletions = changeSet.getDeletionRanges();
    for (int i = deletions.length - 1; i >= 0; i--) {
        OrderedCollectionChangeSet.Range range = deletions[i];
        Log.v("EXAMPLE", range.length + " dogs deleted at " + range.startIndex);
    }
    OrderedCollectionChangeSet.Range[] insertions = changeSet.getInsertionRanges();
    for (OrderedCollectionChangeSet.Range range : insertions) {
        Log.v("EXAMPLE", range.length + " dogs inserted at " + range.startIndex);
    }
    OrderedCollectionChangeSet.Range[] modifications = changeSet.getChangeRanges();
    for (OrderedCollectionChangeSet.Range range : modifications) {
        Log.v("EXAMPLE", range.length + " dogs modified at " + range.startIndex);
    }
};
// Observe collection notifications.
dogs.addChangeListener(changeListener);
