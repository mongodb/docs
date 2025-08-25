import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'utils.dart';
import 'dart:typed_data';

import './pet.dart';
part 'serialization_test.realm.dart';

@RealmModel(ObjectType.embeddedObject)
class _Address {
  late String street;
  late String city;
  late String state;
  late String country;
}

@RealmModel()
class _SerializeModel {
  @PrimaryKey()
  // ObjectID
  late ObjectId id;

  // UUID
  late Uuid myId;

  // Array
  late List<String> listOfStrings;
  late Set<int> setOfInts;
  late Map<String, int> mapOfMixedAnyValues;

  // Binary
  late Uint8List requiredBinaryProperty;

  // Boolean
  bool isElectric = false;

  // Date
  late DateTime dateLastServiced;

  // Document
  late _Address? address; 

  // Double
  double milesDriven = 126.0;

  // Int32 and Int64
  int number32 = 900;
  int number64 = 922393736854775807;

  // String
  late String licensePlate;

  // Null
  int? a;

  // Missing encoders for RealmValue and Decimal 128, engineering ticket number: 
  // RDART-1063 (https://jira.mongodb.org/browse/RDART-1063)
}

main() {
  test('data types', () {

    final config = Configuration.local([SerializeModel.schema, Address.schema]);
    final realm = Realm(config);

    final example = SerializeModel(
      ObjectId(), Uuid.v4(), Uint8List.fromList([1, 2]), DateTime.utc(2024, 4, 10), 
      '90ZXWYZL', listOfStrings: ['food', 'water'], setOfInts: {0, 1, 2, 3},
       mapOfMixedAnyValues: {'first': 123 , 'second': 567}, 
       address: Address("500 Dean Street", "Brooklyn", "NY", "USA"));

    realm.write(() {
      realm.add(example);
    });

    print(example);

    EJsonValue exSerialize = toEJson(example);

    print(exSerialize);

    cleanUpRealm(realm);

  });

  test('serialize', () {

    final config = Configuration.local([Pet.schema]);
    final realm = Realm(config);

    // create pet spider object
    final spider = Pet('Jumping Spider', 8, DateTime.utc(2024, 4, 10));

    realm.write(() {
      realm.add(spider);
    });

    // :snippet-start: serialize
    // Pass the object as a parameter to the method
    EJsonValue serializeByParam = toEJson(spider);

    // Call the method directly on the object
    EJsonValue serializeWithCall = spider.toEJson();
    // :snippet-end:

    print(serializeByParam);

    final birthDate = DateTime.utc(2024, 4, 10);

    // make sure serialized value matches expected
    expect(serializeByParam, {
      'type': 'Jumping Spider',
      'numberOfLegs': {'\$numberInt': '8'},
      'birthDate': {
        '\$date': {'\$numberLong': birthDate.millisecondsSinceEpoch.toString()}
      },
      'price': null,
    });

    // make sure two methods of serialization match
    expect(serializeByParam, serializeWithCall);

    cleanUpRealm(realm);
  });

  test('deserialize', () {

    final config = Configuration.local([Pet.schema]);
    final realm = Realm(config);

    // create pet spider object
    final spider = Pet('Jumping Spider', 8, DateTime.utc(2024, 4, 10));

    realm.write(() {
      realm.add(spider);
    });

    // Pass the object as a parameter to the method
    EJsonValue serializeByParam = toEJson(spider);

    // :snippet-start: deserialize
    // Pass the serialized object to the method
    final deserializeFromEjsonWithExplicitType = fromEJson<Pet>(serializeByParam);

    // The method can also infer the object type
    Pet deserializeFromEjson = fromEJson(serializeByParam);
    // :snippet-end: 

    print(deserializeFromEjson);

    // make sure deserialized returns proper instance of Pet object
    expect(deserializeFromEjson.type, spider.type);

    cleanUpRealm(realm);
  });
}
