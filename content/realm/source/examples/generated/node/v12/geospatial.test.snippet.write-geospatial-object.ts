const realm = await Realm.open({
  // `MyGeoPoint` does not extend `Realm.Object`, so you pass
  // only the `.schema` when opening the realm.
  schema: [Company, MyGeoPoint.schema],
});

// Add geospatial object to realm.
realm.write(() => {
  realm.create(Company, {
    _id: 6,
    location: new MyGeoPoint(-122.35, 47.68),
  });
  realm.create(Company, {
    _id: 9,
    location: new MyGeoPoint(-121.85, 47.9),
  });
});
