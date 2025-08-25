class Car extends Realm.Object {
  static schema = {
    name: "Car",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      make: "string",
      model: "string",
      miles: "int?",
    },
    primaryKey: "_id",
  };
}
