// all tasks in the realm
RealmResults<Task> tasks = uiThreadRealm.where(Task.class).findAllAsync();

tasks.addChangeListener(new OrderedRealmCollectionChangeListener<RealmResults<Task>>() {
    @Override
    public void onChange(RealmResults<Task> collection, OrderedCollectionChangeSet changeSet) {
        // process deletions in reverse order if maintaining parallel data structures so indices don't change as you iterate
        OrderedCollectionChangeSet.Range[] deletions = changeSet.getDeletionRanges();
        for (OrderedCollectionChangeSet.Range range : deletions) {
            Log.v("QUICKSTART", "Deleted range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));
        }

        OrderedCollectionChangeSet.Range[] insertions = changeSet.getInsertionRanges();
        for (OrderedCollectionChangeSet.Range range : insertions) {
            Log.v("QUICKSTART", "Inserted range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));                            }

        OrderedCollectionChangeSet.Range[] modifications = changeSet.getChangeRanges();
        for (OrderedCollectionChangeSet.Range range : modifications) {
            Log.v("QUICKSTART", "Updated range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));                            }
    }
});
