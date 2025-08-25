final carId = ObjectId();
final ownerId = app.currentUser!.id;

realm.write(() {
  // WRITE REVERTED BY QUERY SUBSCRIPTION COMPENSATING WRITE
  // `oldCar` is initially written to the realm, then later removed
  // in a compensating write when the server processes the write.
  // This is because the `miles` property of `oldCar` doesn't match
  // the subscription query, which is only for cars with less than 100 miles.
  final oldCar = Car(carId, ownerId, 'Honda', miles: 90000);
  realm.add(oldCar);
});

// Let changes sync to and from server
await realm.syncSession.waitForUpload();
await realm.syncSession.waitForDownload();

final noCar = realm.find<Car>(carId);
// The Car is no longer in the realm because of
// the compensating write from the server.
expect(noCar, isNull);
