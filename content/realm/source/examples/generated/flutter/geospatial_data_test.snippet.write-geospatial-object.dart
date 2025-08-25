final realm =
    Realm(Configuration.local([MyGeoPoint.schema, Company.schema]));

realm.write(() {
  realm.addAll([
    Company(
      firstCompanyID,
      location: MyGeoPoint(coordinates: [-122.35, 47.68]),
    ),
    Company(
      secondCompanyID,
      location: MyGeoPoint(coordinates: [-121.85, 47.9]),
    )
  ]);
});
