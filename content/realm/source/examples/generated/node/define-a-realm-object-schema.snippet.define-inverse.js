class Manufacturer extends Realm.Object {
  static schema = {
    name: "Manufacturer",
    properties: {
      _id: "objectId",
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
      make: "string",
      model: "string",
      miles: "int?",
      // Backlink to the manufacturer. This is automatically updated whenever
      // this car is added to or removed from a manufacturer's cars list.
      assignee: {
        type: "linkingObjects",
        objectType: "Manufacturer",
        property: "cars",
      },
    },
  };
}
