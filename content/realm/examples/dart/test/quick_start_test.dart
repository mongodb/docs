import 'package:test/test.dart';
import '../bin/models/car.dart';
import 'package:realm_dart/realm.dart';


void main() {
  group('CRUD Operations', () {
    setUpAll(() {
      final realm = Realm(Configuration.local([Car.schema]));
      realm.write(() {
        realm.deleteAll<Car>();
      });
      realm.close();
      Realm.deleteRealm(realm.config.path);
    });
    tearDownAll(() {
      final realm = Realm(Configuration.local([Car.schema]));
      realm.write(() {
        realm.deleteAll<Car>();
      });
      realm.close();
      Realm.deleteRealm(realm.config.path);
    });
    test('Create Realm Object', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);
      Car? addedCar;
      // :snippet-start: create-realm-object
      final car = Car(ObjectId(), 'Tesla', model: 'Model S', miles: 42);
      realm.write(() {
        addedCar = realm.add(car); // :remove:
        // :uncomment-start:
        //realm.add(car);
        // :uncomment-end:
      });
      // :snippet-end:
      expect(addedCar == car, true);
      realm.write(() {
        realm.delete(car); // clean up
      });
      realm.close();
    });

    test('Query All Realm Objects', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);

      realm.write(() {
        realm.add(Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42));
      });
      // :snippet-start: query-all-realm-objects
      final cars = realm.all<Car>();
      final myCar = cars[0];
      print('My car is ${myCar.make} ${myCar.model}');
      // :snippet-end:
      expect(myCar.miles, 42);
      expect(myCar.make, 'Tesla');
      expect(myCar.model, 'Model Y');
      realm.write(() {
        realm.deleteMany(cars); // clean up
      }); // clean up
      realm.close();
    });
    test('Query Realm Objects with Filter', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);
      realm.write(() {
        realm.add(Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42));
        realm.add(Car(ObjectId(), 'Toyota', model: 'Prius', miles: 99));
      });
      // :snippet-start: query-realm-objects-with-filter
      final cars = realm.query<Car>('make == "Tesla"');
      // :snippet-end:
      expect(cars.length, 1);
      expect(cars[0].make, 'Tesla');
      realm.write(() {
        realm.deleteMany(realm.all<Car>());
      }); // clean up
      realm.close();
    });

    test('Update Realm Object', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);

      final car = Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42);
      realm.write(() {
        realm.add(car);
      });
      // :snippet-start: update-realm-object
      realm.write(() {
        car.miles = 99;
      });
      // :snippet-end:
      expect(car.miles, 99);
      expect(car.make, 'Tesla');
      expect(car.model, 'Model Y');
      realm.write(() {
        realm.delete(car); // clean up
      });
      realm.close();
    });

    test('Delete One Realm Object', () {
      final config = Configuration.local([Car.schema]);
      final realm = Realm(config);

      final car = Car(ObjectId(), 'Tesla', model: 'Model Y', miles: 42);
      realm.write(() {
        realm.add(car);
      });
      // :snippet-start: delete-one-realm-object
      realm.write(() {
        realm.delete(car);
      });
      // :snippet-end:
      var cars = realm.all<Car>();
      expect(cars.length, 0);
      realm.close();
    });
  });
}
