// used in Define Realm Object Schema page
import 'package:realm_dart/realm.dart';
// :snippet-start: part-directive
part 'schemas.realm.dart';
// :snippet-end:

// :snippet-start: create-realm-model
@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}
// :snippet-end:

// :snippet-start: sync-schema
@RealmModel()
class _SyncSchema {
  @PrimaryKey()
  @MapTo("_id")
  late ObjectId id;

  // ... other properties
}

// :snippet-end:
// :snippet-start: many-to-one-models
@RealmModel()
class _Bike {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late _Person? owner;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late ObjectId id;

  late String firstName;
  late String lastName;
  late int? age;
}

// :snippet-end:
// :snippet-start: many-to-many-models
@RealmModel()
class _Scooter {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late _Person? owner;
}

@RealmModel()
class _ScooterShop {
  @PrimaryKey()
  late ObjectId id;

  late String name;
  late List<_Scooter> scooters;
}
// :snippet-end:

// :snippet-start: property-annotations
class _Vehicle {
  @PrimaryKey()
  late ObjectId id;

  late String? maybeDescription; // optional value

  late double milesTravelled = 0; // 0 is default value

  @Ignored()
  late String notInRealmModel;

  @Indexed()
  late String make;

  @MapTo('wheels') // 'wheels' is property name in the RealmObject
  late int numberOfWheels;
}

// :snippet-end:
