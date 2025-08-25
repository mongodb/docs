class Manufacturer extends Realm.Object {
  _id!: BSON.ObjectId;
  name!: string;
  cars!: Realm.List<Car>;
  warranties!: Realm.List<Warranty>;

  static schema: ObjectSchema = {
    name: "Manufacturer",
    properties: {
      _id: "objectId",
      name: "string",
      cars: "Car[]",
      // Embed an array of objects
      warranties: "Warranty[]",
    },
  };
}

class Car extends Realm.Object {
  _id!: BSON.ObjectId;
  model!: string;
  miles?: number;
  warranty?: Warranty;

  static schema: ObjectSchema = {
    name: "Car",
    properties: {
      _id: "objectId",
      model: "string",
      miles: "int?",
      // Embed one object
      warranty: "Warranty?",
    },
  };
}

class Warranty extends Realm.Object {
  name!: string;
  termLength!: number;
  cost!: number;

  static schema: ObjectSchema = {
    name: "Warranty",
    embedded: true,
    properties: {
      name: "string",
      termLength: "int",
      cost: "int",
    },
  };
}
