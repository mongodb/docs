final fellowshipSubscription =
    fellowshipOfTheRing.members.changes.listen((changes) {
  changes.inserted; // Indexes of inserted objects.
  changes.modified; // Indexes of modified objects.
  changes.deleted; // Indexes of deleted objects.
  changes.newModified; // Indexes of modified objects after accounting for deletions & insertions.
  changes.moved; // Indexes of moved objects.
  changes.list; // The full RealmList of objects.
  changes.isCleared; // `true` after call to fellowshipOfTheRing.members.clear(); otherwise, `false`.
  changes.isCollectionDeleted; // `true` if the collection is deleted; otherwise, `false`.
});
