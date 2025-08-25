// Listen for changes on whole collection
final characters = realm.all<Character>();
final subscription = characters.changes.listen((changes) {
  changes.inserted; // Indexes of inserted objects.
  changes.modified; // Indexes of modified objects.
  changes.deleted; // Indexes of deleted objects.
  changes.newModified; // Indexes of modified objects after accounting for deletions & insertions.
  changes.moved; // Indexes of moved objects.
  changes.results; // The full List of objects.
  changes.isCleared; // `true` after call to characters.clear(); otherwise, `false`.
});

// Listen for changes on RealmResults.
final hobbits = fellowshipOfTheRing.members.query('species == "Hobbit"');
final hobbitsSubscription = hobbits.changes.listen((changes) {
  // ... all the same data as above
});
