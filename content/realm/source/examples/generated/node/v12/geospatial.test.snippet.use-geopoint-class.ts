class Company extends Realm.Object<Company> {
  _id!: number;
  location!: MyGeoPoint;

  static schema: ObjectSchema = {
    name: "Company",
    properties: {
      _id: "int",
      location: "MyGeoPoint",
    },
    primaryKey: "_id",
  };
}
