class Car extends Realm.Object {
  static schema = {
    name: "Car",
    properties: {
      _id: { type: "objectId", indexed: true },
      make: "string",
      model_name: { type: "string", mapTo: "modelName" },
      miles: { type: "int", default: 0 },
    },
    primaryKey: "_id",
  };
}
