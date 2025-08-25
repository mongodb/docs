// Create a Realm object with date in UTC, or convert with .toUtc() before storing
final subaruOutback = realm.write<Vehicle>(() {
  return realm.add(
      Vehicle(ObjectId(), 'Subie', DateTime.utc(2022, 9, 18, 12, 30, 0)));
});

final fordFusion =
    Vehicle(ObjectId(), 'Fuse', DateTime(2022, 9, 18, 8, 30, 0).toUtc());
realm.write(() {
  realm.add(fordFusion);
});

// When you query the object, the `DateTime` returned is UTC
final queriedSubaruOutback =
    realm.all<Vehicle>().query('nickname == "Subie"')[0];

// If your app needs it, convert it to Local() or the desired time zone
final localizedSubieDateLastServiced =
    queriedSubaruOutback.dateLastServiced.toLocal();
