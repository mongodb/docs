class Manufacturer extends Realm.Object {
  static schema = {
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
  static schema = {
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
  static schema = {
    name: "Warranty",
    embedded: true,
    properties: {
      name: "string",
      termLength: "int",
      cost: "int",
    },
  };
}
