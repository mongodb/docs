class Manufacturer extends Realm.Object {
  static schema = {
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
  static schema = {
    name: "Car",
    properties: {
      _id: "objectId",
      model: "string",
      miles: "int?",
    },
  };
}
