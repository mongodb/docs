class Manufacturer extends Realm.Object {
  static schema = {
    name: "Manufacturer",
    properties: {
      _id: "objectId",
      // A manufacturer that may have one car
      car: "Car?",
    },
  };
}

class Car extends Realm.Object {
  static schema = {
    name: "Car",
    properties: {
      _id: "objectId",
      make: "string",
      model: "string",
      miles: "int?",
    },
  };
}
