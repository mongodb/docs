// Write data to realm and it automatically syncs with Atlas
// in the background.
realm.write(() {
  realm.add(Car(ObjectId(), 'Toyota', model: 'Rav 4'));
});
