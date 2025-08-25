// Per the Device Sync permissions, users can only read and write data
// where the `Car.ownerId` property matches their own user ID.
final userId = user.id;

realm.write(() {
  // WRITE SUCCEEDS
  // `newCar` is successfully written to the realm and synced to Atlas
  // because it's data matches the subscription query (miles < 100)
  // and it's `ownerId` field matches the user ID.
  final newCar = Car(ObjectId(), userId, 'Toyota', miles: 2);
  realm.add(newCar);
});
