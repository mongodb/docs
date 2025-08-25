class Manufacturer extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  cars!: Realm.List<Car>;

  static schema: ObjectSchema = {
    name: "Manufacturer",
    properties: {
      _id: "objectId",
      name: "string",
      // A manufacturer that may have many cars
      cars: "Car[]",
    },
  };
}

class Car extends Realm.Object {
  _id!: BSON.ObjectId;
  model!: string;
  miles?: number;
  manufacturer!: Realm.Collection<Manufacturer>;

  static schema: ObjectSchema = {
    name: "Car",
    properties: {
      _id: "objectId",
      model: "string",
      miles: "int?",
      manufacturer: {
        type: "linkingObjects",
        objectType: "Manufacturer",
        property: "cars",
      },
    },
  };
}
