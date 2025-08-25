import Realm, { BSON, ObjectSchema } from "realm";

describe("Define Relationship Properties", () => {
  test("should define a to-one relationship", async () => {
    // :snippet-start: define-one-to-one
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
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Manufacturer, Car],
    });
    expect(realm.isClosed).toBe(false);

    realm.write(() => {
      const thisCar = realm.create(Car, {
        _id: new BSON.ObjectID(),
        model: "Sentra",
        miles: 1000,
      });

      realm.create(Manufacturer, {
        _id: new BSON.ObjectID(),
        name: "Nissan",
        car: thisCar,
      });
    });

    const manufacturers: Realm.Results<Manufacturer> =
      realm.objects(Manufacturer);

    const manufacturerCar = manufacturers[0].car;
    expect(manufacturerCar?.model).toBe("Sentra");

    // close the realm
    realm.close();
  });

  test("should define a to-many relationship", async () => {
    // :snippet-start: define-one-to-many
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

      static schema: ObjectSchema = {
        name: "Car",
        properties: {
          _id: "objectId",
          model: "string",
          miles: "int?",
        },
      };
    }
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Manufacturer, Car],
    });
    expect(realm.isClosed).toBe(false);

    realm.write(() => {
      const sentra = realm.create(Car, {
        _id: new BSON.ObjectID(),
        model: "Sentra",
        miles: 1000,
      });

      const pathfinder = realm.create(Car, {
        _id: new BSON.ObjectID(),
        model: "Pathfinder",
        miles: 254,
      });

      realm.create(Manufacturer, {
        _id: new BSON.ObjectID(),
        name: "Nissan",
        cars: [sentra, pathfinder],
      });
    });

    const manufacturers: Realm.Results<Manufacturer> =
      realm.objects(Manufacturer);

    const manufacturerCars = manufacturers[0].cars;

    // :snippet-start: obtain-inverse-relationship-dynamically
    const carObjects = realm.objects<Car>(Car);
    // Get the Manufacturer who makes the Car
    const linkedManufacturer: Manufacturer =
      carObjects[0].linkingObjects<Manufacturer>("Manufacturer", "cars")[0];
    expect(linkedManufacturer.name).toBe("Nissan");
    // :snippet-end:

    expect(manufacturerCars[0].model).toBe("Sentra");
    expect(manufacturerCars[1].model).toBe("Pathfinder");

    // close the realm
    realm.close();
  });

  test("should define an inverse relationship using model classes", async () => {
    // :snippet-start: define-inverse
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
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Manufacturer, Car],
    });

    const manufacturerObjectId = new BSON.ObjectId();
    realm.write(() => {
      const sentra = realm.create(Car.name, {
        _id: new BSON.ObjectID(),
        model: "Sentra",
        miles: 1000,
      });

      realm.create(Manufacturer.name, {
        _id: manufacturerObjectId,
        name: "Nissan",
        cars: [sentra],
      });
    });

    const carRealmObjects = realm.objects<Car>("Car");
    const carsWithManufacturerMatchingId = carRealmObjects.filtered(
      "manufacturer._id == $0",
      manufacturerObjectId
    );

    // If the backlink was set properly, the car object we created should
    // match the filter looking for manufacturers matching the OID
    const filteredCarWithManufacturerMatchingId =
      carsWithManufacturerMatchingId[0];
    expect(filteredCarWithManufacturerMatchingId.model).toBe("Sentra");

    // close the realm
    realm.close();
  });

  test("should define an embedded object property using model classes", async () => {
    // :snippet-start: define-embedded-property-model-classes
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
    // :snippet-end:

    const realm = await Realm.open({
      schema: [Manufacturer, Car, Warranty],
    });
    expect(realm.isClosed).toBe(false);

    realm.write(() => {
      const sentra = realm.create(Car, {
        _id: new BSON.ObjectID(),
        model: "Sentra",
        miles: 1000,
        // Realm does not support explicit creation of EmbeddedObject
        // so you must create in the context of the parent object
        warranty: {
          name: "Premium",
          termLength: 12,
          cost: 500,
        } as Warranty,
      });

      const manufacturer = realm.create(Manufacturer, {
        _id: new BSON.ObjectID(),
        name: "Nissan",
        cars: [sentra],
        warranties: [
          {
            name: "Premium",
            termLength: 12,
            cost: 500,
          },
        ],
      });
    });

    const manufacturers: Realm.Results<Manufacturer> =
      realm.objects(Manufacturer);

    const manufacturerSentraWarranty = manufacturers[0].cars[0].warranty;
    const manufacturerWarranties = manufacturers.filtered(
      "warranties.termLength == $0",
      12
    );

    expect(manufacturerSentraWarranty?.name).toBe("Premium");
    expect(manufacturerWarranties.length).toBe(1);

    // close the realm
    realm.close();
  });
});
