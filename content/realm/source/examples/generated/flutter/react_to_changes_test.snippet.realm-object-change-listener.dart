final frodoSubscription = frodo.changes.listen((changes) {
  changes.isDeleted; // If the object has been deleted.
  changes.object; // The RealmObject being listened to, `frodo`.
  changes.properties; // The changed properties.
});
