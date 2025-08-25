class Company extends Realm.Object {
  static schema = {
    name: "Company",
    properties: {
      _id: "int",
      location: "MyGeoPoint",
    },
    primaryKey: "_id",
  };
}
