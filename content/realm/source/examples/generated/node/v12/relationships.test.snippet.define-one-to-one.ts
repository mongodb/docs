class Manufacturer extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  car?: Car;

  static schema: ObjectSchema = {
    name: "Manufacturer",
    properties: {
      _id: "objectId",
      name: "string",
      // A manufacturer that may have one car
      car: "Car?",
    },
  };
}

class Car extends Realm.Object {
  _id!: BSON.ObjectId;
  model!: string;
  miles?: number;

  static schema: ObjectSchema = {
    name: "Car",
    properties: {
      _id: "objectId",
      model: "string",
      miles: "int?",
    },
  };
}
