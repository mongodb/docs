final carId = 'someOtherId';

realm.write(() {
  // WRITE REVERTED BY PERMISSION ERROR
  // `otherUsersCar` is initially written to the realm, then removed upon synchronization
  // because it's `ownerId` property doesn't match the user ID of the user
  // making the request.
  final otherUsersCar = Car(ObjectId(), carId, 'Ford');
  realm.add(otherUsersCar);
});

// sync changes
await realm.syncSession.waitForUpload();
await realm.syncSession.waitForDownload();

final noCar = realm.find<Car>(carId);
// The Car is no longer in the realm because of
// the compensating write from the server.
expect(noCar, isNull);
