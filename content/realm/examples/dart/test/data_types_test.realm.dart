// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'data_types_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Address extends _Address
    with RealmEntity, RealmObjectBase, EmbeddedObject {
  Address(
    String street,
    String city,
    String state,
    String country,
  ) {
    RealmObjectBase.set(this, 'street', street);
    RealmObjectBase.set(this, 'city', city);
    RealmObjectBase.set(this, 'state', state);
    RealmObjectBase.set(this, 'country', country);
  }

  Address._();

  @override
  String get street => RealmObjectBase.get<String>(this, 'street') as String;
  @override
  set street(String value) => RealmObjectBase.set(this, 'street', value);

  @override
  String get city => RealmObjectBase.get<String>(this, 'city') as String;
  @override
  set city(String value) => RealmObjectBase.set(this, 'city', value);

  @override
  String get state => RealmObjectBase.get<String>(this, 'state') as String;
  @override
  set state(String value) => RealmObjectBase.set(this, 'state', value);

  @override
  String get country => RealmObjectBase.get<String>(this, 'country') as String;
  @override
  set country(String value) => RealmObjectBase.set(this, 'country', value);

  @override
  Stream<RealmObjectChanges<Address>> get changes =>
      RealmObjectBase.getChanges<Address>(this);

  @override
  Stream<RealmObjectChanges<Address>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Address>(this, keyPaths);

  @override
  Address freeze() => RealmObjectBase.freezeObject<Address>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'street': street.toEJson(),
      'city': city.toEJson(),
      'state': state.toEJson(),
      'country': country.toEJson(),
    };
  }

  static EJsonValue _toEJson(Address value) => value.toEJson();
  static Address _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'street': EJsonValue street,
        'city': EJsonValue city,
        'state': EJsonValue state,
        'country': EJsonValue country,
      } =>
        Address(
          fromEJson(street),
          fromEJson(city),
          fromEJson(state),
          fromEJson(country),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Address._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.embeddedObject, Address, 'Address', [
      SchemaProperty('street', RealmPropertyType.string),
      SchemaProperty('city', RealmPropertyType.string),
      SchemaProperty('state', RealmPropertyType.string),
      SchemaProperty('country', RealmPropertyType.string),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Person extends _Person with RealmEntity, RealmObjectBase, RealmObject {
  Person(
    ObjectId id,
    String name, {
    Address? address,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'address', address);
  }

  Person._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  Address? get address =>
      RealmObjectBase.get<Address>(this, 'address') as Address?;
  @override
  set address(covariant Address? value) =>
      RealmObjectBase.set(this, 'address', value);

  @override
  Stream<RealmObjectChanges<Person>> get changes =>
      RealmObjectBase.getChanges<Person>(this);

  @override
  Stream<RealmObjectChanges<Person>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Person>(this, keyPaths);

  @override
  Person freeze() => RealmObjectBase.freezeObject<Person>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'address': address.toEJson(),
    };
  }

  static EJsonValue _toEJson(Person value) => value.toEJson();
  static Person _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'address': EJsonValue address,
      } =>
        Person(
          fromEJson(id),
          fromEJson(name),
          address: fromEJson(address),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Person._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Person, 'Person', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('address', RealmPropertyType.object,
          optional: true, linkTarget: 'Address'),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Car extends _Car with RealmEntity, RealmObjectBase, RealmObject {
  static var _defaultsSet = false;

  Car(
    ObjectId id, {
    String? licensePlate,
    bool isElectric = false,
    double milesDriven = 0,
    Iterable<String> attributes = const [],
    Person? owner,
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<Car>({
        'isElectric': false,
        'milesDriven': 0,
      });
    }
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'licensePlate', licensePlate);
    RealmObjectBase.set(this, 'isElectric', isElectric);
    RealmObjectBase.set(this, 'milesDriven', milesDriven);
    RealmObjectBase.set<RealmList<String>>(
        this, 'attributes', RealmList<String>(attributes));
    RealmObjectBase.set(this, 'owner', owner);
  }

  Car._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String? get licensePlate =>
      RealmObjectBase.get<String>(this, 'licensePlate') as String?;
  @override
  set licensePlate(String? value) =>
      RealmObjectBase.set(this, 'licensePlate', value);

  @override
  bool get isElectric => RealmObjectBase.get<bool>(this, 'isElectric') as bool;
  @override
  set isElectric(bool value) => RealmObjectBase.set(this, 'isElectric', value);

  @override
  double get milesDriven =>
      RealmObjectBase.get<double>(this, 'milesDriven') as double;
  @override
  set milesDriven(double value) =>
      RealmObjectBase.set(this, 'milesDriven', value);

  @override
  RealmList<String> get attributes =>
      RealmObjectBase.get<String>(this, 'attributes') as RealmList<String>;
  @override
  set attributes(covariant RealmList<String> value) =>
      throw RealmUnsupportedSetError();

  @override
  Person? get owner => RealmObjectBase.get<Person>(this, 'owner') as Person?;
  @override
  set owner(covariant Person? value) =>
      RealmObjectBase.set(this, 'owner', value);

  @override
  Stream<RealmObjectChanges<Car>> get changes =>
      RealmObjectBase.getChanges<Car>(this);

  @override
  Stream<RealmObjectChanges<Car>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Car>(this, keyPaths);

  @override
  Car freeze() => RealmObjectBase.freezeObject<Car>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'licensePlate': licensePlate.toEJson(),
      'isElectric': isElectric.toEJson(),
      'milesDriven': milesDriven.toEJson(),
      'attributes': attributes.toEJson(),
      'owner': owner.toEJson(),
    };
  }

  static EJsonValue _toEJson(Car value) => value.toEJson();
  static Car _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'licensePlate': EJsonValue licensePlate,
        'isElectric': EJsonValue isElectric,
        'milesDriven': EJsonValue milesDriven,
        'attributes': EJsonValue attributes,
        'owner': EJsonValue owner,
      } =>
        Car(
          fromEJson(id),
          licensePlate: fromEJson(licensePlate),
          isElectric: fromEJson(isElectric),
          milesDriven: fromEJson(milesDriven),
          attributes: fromEJson(attributes),
          owner: fromEJson(owner),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Car._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Car, 'Car', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('licensePlate', RealmPropertyType.string, optional: true),
      SchemaProperty('isElectric', RealmPropertyType.bool),
      SchemaProperty('milesDriven', RealmPropertyType.double),
      SchemaProperty('attributes', RealmPropertyType.string,
          collectionType: RealmCollectionType.list),
      SchemaProperty('owner', RealmPropertyType.object,
          optional: true, linkTarget: 'Person'),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class UuidPrimaryKey extends _UuidPrimaryKey
    with RealmEntity, RealmObjectBase, RealmObject {
  UuidPrimaryKey(
    Uuid id,
  ) {
    RealmObjectBase.set(this, 'id', id);
  }

  UuidPrimaryKey._();

  @override
  Uuid get id => RealmObjectBase.get<Uuid>(this, 'id') as Uuid;
  @override
  set id(Uuid value) => RealmObjectBase.set(this, 'id', value);

  @override
  Stream<RealmObjectChanges<UuidPrimaryKey>> get changes =>
      RealmObjectBase.getChanges<UuidPrimaryKey>(this);

  @override
  Stream<RealmObjectChanges<UuidPrimaryKey>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<UuidPrimaryKey>(this, keyPaths);

  @override
  UuidPrimaryKey freeze() => RealmObjectBase.freezeObject<UuidPrimaryKey>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
    };
  }

  static EJsonValue _toEJson(UuidPrimaryKey value) => value.toEJson();
  static UuidPrimaryKey _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
      } =>
        UuidPrimaryKey(
          fromEJson(id),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(UuidPrimaryKey._);
    register(_toEJson, _fromEJson);
    return SchemaObject(
        ObjectType.realmObject, UuidPrimaryKey, 'UuidPrimaryKey', [
      SchemaProperty('id', RealmPropertyType.uuid, primaryKey: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class ObjectIdPrimaryKey extends _ObjectIdPrimaryKey
    with RealmEntity, RealmObjectBase, RealmObject {
  ObjectIdPrimaryKey(
    ObjectId id,
  ) {
    RealmObjectBase.set(this, 'id', id);
  }

  ObjectIdPrimaryKey._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  Stream<RealmObjectChanges<ObjectIdPrimaryKey>> get changes =>
      RealmObjectBase.getChanges<ObjectIdPrimaryKey>(this);

  @override
  Stream<RealmObjectChanges<ObjectIdPrimaryKey>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<ObjectIdPrimaryKey>(this, keyPaths);

  @override
  ObjectIdPrimaryKey freeze() =>
      RealmObjectBase.freezeObject<ObjectIdPrimaryKey>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
    };
  }

  static EJsonValue _toEJson(ObjectIdPrimaryKey value) => value.toEJson();
  static ObjectIdPrimaryKey _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
      } =>
        ObjectIdPrimaryKey(
          fromEJson(id),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(ObjectIdPrimaryKey._);
    register(_toEJson, _fromEJson);
    return SchemaObject(
        ObjectType.realmObject, ObjectIdPrimaryKey, 'ObjectIdPrimaryKey', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class RealmValueExample extends _RealmValueExample
    with RealmEntity, RealmObjectBase, RealmObject {
  RealmValueExample({
    RealmValue singleAnyValue = const RealmValue.nullValue(),
    Iterable<RealmValue> listOfMixedAnyValues = const [],
    Set<RealmValue> setOfMixedAnyValues = const {},
    Map<String, RealmValue> mapOfMixedAnyValues = const {},
  }) {
    RealmObjectBase.set(this, 'singleAnyValue', singleAnyValue);
    RealmObjectBase.set<RealmList<RealmValue>>(this, 'listOfMixedAnyValues',
        RealmList<RealmValue>(listOfMixedAnyValues));
    RealmObjectBase.set<RealmSet<RealmValue>>(
        this, 'setOfMixedAnyValues', RealmSet<RealmValue>(setOfMixedAnyValues));
    RealmObjectBase.set<RealmMap<RealmValue>>(
        this, 'mapOfMixedAnyValues', RealmMap<RealmValue>(mapOfMixedAnyValues));
  }

  RealmValueExample._();

  @override
  RealmValue get singleAnyValue =>
      RealmObjectBase.get<RealmValue>(this, 'singleAnyValue') as RealmValue;
  @override
  set singleAnyValue(RealmValue value) =>
      RealmObjectBase.set(this, 'singleAnyValue', value);

  @override
  RealmList<RealmValue> get listOfMixedAnyValues =>
      RealmObjectBase.get<RealmValue>(this, 'listOfMixedAnyValues')
          as RealmList<RealmValue>;
  @override
  set listOfMixedAnyValues(covariant RealmList<RealmValue> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmSet<RealmValue> get setOfMixedAnyValues =>
      RealmObjectBase.get<RealmValue>(this, 'setOfMixedAnyValues')
          as RealmSet<RealmValue>;
  @override
  set setOfMixedAnyValues(covariant RealmSet<RealmValue> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmMap<RealmValue> get mapOfMixedAnyValues =>
      RealmObjectBase.get<RealmValue>(this, 'mapOfMixedAnyValues')
          as RealmMap<RealmValue>;
  @override
  set mapOfMixedAnyValues(covariant RealmMap<RealmValue> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<RealmValueExample>> get changes =>
      RealmObjectBase.getChanges<RealmValueExample>(this);

  @override
  Stream<RealmObjectChanges<RealmValueExample>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<RealmValueExample>(this, keyPaths);

  @override
  RealmValueExample freeze() =>
      RealmObjectBase.freezeObject<RealmValueExample>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'singleAnyValue': singleAnyValue.toEJson(),
      'listOfMixedAnyValues': listOfMixedAnyValues.toEJson(),
      'setOfMixedAnyValues': setOfMixedAnyValues.toEJson(),
      'mapOfMixedAnyValues': mapOfMixedAnyValues.toEJson(),
    };
  }

  static EJsonValue _toEJson(RealmValueExample value) => value.toEJson();
  static RealmValueExample _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'singleAnyValue': EJsonValue singleAnyValue,
        'listOfMixedAnyValues': EJsonValue listOfMixedAnyValues,
        'setOfMixedAnyValues': EJsonValue setOfMixedAnyValues,
        'mapOfMixedAnyValues': EJsonValue mapOfMixedAnyValues,
      } =>
        RealmValueExample(
          singleAnyValue: fromEJson(singleAnyValue),
          listOfMixedAnyValues: fromEJson(listOfMixedAnyValues),
          setOfMixedAnyValues: fromEJson(setOfMixedAnyValues),
          mapOfMixedAnyValues: fromEJson(mapOfMixedAnyValues),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(RealmValueExample._);
    register(_toEJson, _fromEJson);
    return SchemaObject(
        ObjectType.realmObject, RealmValueExample, 'RealmValueExample', [
      SchemaProperty('singleAnyValue', RealmPropertyType.mixed,
          optional: true, indexType: RealmIndexType.regular),
      SchemaProperty('listOfMixedAnyValues', RealmPropertyType.mixed,
          optional: true, collectionType: RealmCollectionType.list),
      SchemaProperty('setOfMixedAnyValues', RealmPropertyType.mixed,
          optional: true, collectionType: RealmCollectionType.set),
      SchemaProperty('mapOfMixedAnyValues', RealmPropertyType.mixed,
          optional: true, collectionType: RealmCollectionType.map),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class RealmValueCollectionExample extends _RealmValueCollectionExample
    with RealmEntity, RealmObjectBase, RealmObject {
  RealmValueCollectionExample({
    RealmValue singleAnyValue = const RealmValue.nullValue(),
  }) {
    RealmObjectBase.set(this, 'singleAnyValue', singleAnyValue);
  }

  RealmValueCollectionExample._();

  @override
  RealmValue get singleAnyValue =>
      RealmObjectBase.get<RealmValue>(this, 'singleAnyValue') as RealmValue;
  @override
  set singleAnyValue(RealmValue value) =>
      RealmObjectBase.set(this, 'singleAnyValue', value);

  @override
  Stream<RealmObjectChanges<RealmValueCollectionExample>> get changes =>
      RealmObjectBase.getChanges<RealmValueCollectionExample>(this);

  @override
  Stream<RealmObjectChanges<RealmValueCollectionExample>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<RealmValueCollectionExample>(
          this, keyPaths);

  @override
  RealmValueCollectionExample freeze() =>
      RealmObjectBase.freezeObject<RealmValueCollectionExample>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'singleAnyValue': singleAnyValue.toEJson(),
    };
  }

  static EJsonValue _toEJson(RealmValueCollectionExample value) =>
      value.toEJson();
  static RealmValueCollectionExample _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'singleAnyValue': EJsonValue singleAnyValue,
      } =>
        RealmValueCollectionExample(
          singleAnyValue: fromEJson(singleAnyValue),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(RealmValueCollectionExample._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, RealmValueCollectionExample,
        'RealmValueCollectionExample', [
      SchemaProperty('singleAnyValue', RealmPropertyType.mixed,
          optional: true, indexType: RealmIndexType.regular),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Vehicle extends _Vehicle with RealmEntity, RealmObjectBase, RealmObject {
  Vehicle(
    ObjectId id,
    String nickname,
    DateTime dateLastServiced,
  ) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'nickname', nickname);
    RealmObjectBase.set(this, 'dateLastServiced', dateLastServiced);
  }

  Vehicle._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get nickname =>
      RealmObjectBase.get<String>(this, 'nickname') as String;
  @override
  set nickname(String value) => RealmObjectBase.set(this, 'nickname', value);

  @override
  DateTime get dateLastServiced =>
      RealmObjectBase.get<DateTime>(this, 'dateLastServiced') as DateTime;
  @override
  set dateLastServiced(DateTime value) =>
      RealmObjectBase.set(this, 'dateLastServiced', value);

  @override
  Stream<RealmObjectChanges<Vehicle>> get changes =>
      RealmObjectBase.getChanges<Vehicle>(this);

  @override
  Stream<RealmObjectChanges<Vehicle>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Vehicle>(this, keyPaths);

  @override
  Vehicle freeze() => RealmObjectBase.freezeObject<Vehicle>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'nickname': nickname.toEJson(),
      'dateLastServiced': dateLastServiced.toEJson(),
    };
  }

  static EJsonValue _toEJson(Vehicle value) => value.toEJson();
  static Vehicle _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'nickname': EJsonValue nickname,
        'dateLastServiced': EJsonValue dateLastServiced,
      } =>
        Vehicle(
          fromEJson(id),
          fromEJson(nickname),
          fromEJson(dateLastServiced),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Vehicle._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Vehicle, 'Vehicle', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('nickname', RealmPropertyType.string),
      SchemaProperty('dateLastServiced', RealmPropertyType.timestamp),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Player extends _Player with RealmEntity, RealmObjectBase, RealmObject {
  Player(
    ObjectId id,
    String username, {
    Iterable<Item> inventory = const [],
    Iterable<String> traits = const [],
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'username', username);
    RealmObjectBase.set<RealmList<Item>>(
        this, 'inventory', RealmList<Item>(inventory));
    RealmObjectBase.set<RealmList<String>>(
        this, 'traits', RealmList<String>(traits));
  }

  Player._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get username =>
      RealmObjectBase.get<String>(this, 'username') as String;
  @override
  set username(String value) => RealmObjectBase.set(this, 'username', value);

  @override
  RealmList<Item> get inventory =>
      RealmObjectBase.get<Item>(this, 'inventory') as RealmList<Item>;
  @override
  set inventory(covariant RealmList<Item> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmList<String> get traits =>
      RealmObjectBase.get<String>(this, 'traits') as RealmList<String>;
  @override
  set traits(covariant RealmList<String> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<Player>> get changes =>
      RealmObjectBase.getChanges<Player>(this);

  @override
  Stream<RealmObjectChanges<Player>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Player>(this, keyPaths);

  @override
  Player freeze() => RealmObjectBase.freezeObject<Player>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'username': username.toEJson(),
      'inventory': inventory.toEJson(),
      'traits': traits.toEJson(),
    };
  }

  static EJsonValue _toEJson(Player value) => value.toEJson();
  static Player _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'username': EJsonValue username,
        'inventory': EJsonValue inventory,
        'traits': EJsonValue traits,
      } =>
        Player(
          fromEJson(id),
          fromEJson(username),
          inventory: fromEJson(inventory),
          traits: fromEJson(traits),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Player._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Player, 'Player', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('username', RealmPropertyType.string),
      SchemaProperty('inventory', RealmPropertyType.object,
          linkTarget: 'Item', collectionType: RealmCollectionType.list),
      SchemaProperty('traits', RealmPropertyType.string,
          collectionType: RealmCollectionType.list),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Item extends _Item with RealmEntity, RealmObjectBase, RealmObject {
  Item(
    ObjectId id,
    String name,
    String description,
  ) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'description', description);
  }

  Item._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  String get description =>
      RealmObjectBase.get<String>(this, 'description') as String;
  @override
  set description(String value) =>
      RealmObjectBase.set(this, 'description', value);

  @override
  Stream<RealmObjectChanges<Item>> get changes =>
      RealmObjectBase.getChanges<Item>(this);

  @override
  Stream<RealmObjectChanges<Item>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Item>(this, keyPaths);

  @override
  Item freeze() => RealmObjectBase.freezeObject<Item>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'description': description.toEJson(),
    };
  }

  static EJsonValue _toEJson(Item value) => value.toEJson();
  static Item _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'description': EJsonValue description,
      } =>
        Item(
          fromEJson(id),
          fromEJson(name),
          fromEJson(description),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Item._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Item, 'Item', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('description', RealmPropertyType.string),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class RealmSetExample extends _RealmSetExample
    with RealmEntity, RealmObjectBase, RealmObject {
  RealmSetExample({
    Set<String> primitiveSet = const {},
    Set<int?> nullablePrimitiveSet = const {},
    Set<SomeRealmModel> realmObjectSet = const {},
  }) {
    RealmObjectBase.set<RealmSet<String>>(
        this, 'primitiveSet', RealmSet<String>(primitiveSet));
    RealmObjectBase.set<RealmSet<int?>>(
        this, 'nullablePrimitiveSet', RealmSet<int?>(nullablePrimitiveSet));
    RealmObjectBase.set<RealmSet<SomeRealmModel>>(
        this, 'realmObjectSet', RealmSet<SomeRealmModel>(realmObjectSet));
  }

  RealmSetExample._();

  @override
  RealmSet<String> get primitiveSet =>
      RealmObjectBase.get<String>(this, 'primitiveSet') as RealmSet<String>;
  @override
  set primitiveSet(covariant RealmSet<String> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmSet<int?> get nullablePrimitiveSet =>
      RealmObjectBase.get<int?>(this, 'nullablePrimitiveSet') as RealmSet<int?>;
  @override
  set nullablePrimitiveSet(covariant RealmSet<int?> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmSet<SomeRealmModel> get realmObjectSet =>
      RealmObjectBase.get<SomeRealmModel>(this, 'realmObjectSet')
          as RealmSet<SomeRealmModel>;
  @override
  set realmObjectSet(covariant RealmSet<SomeRealmModel> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<RealmSetExample>> get changes =>
      RealmObjectBase.getChanges<RealmSetExample>(this);

  @override
  Stream<RealmObjectChanges<RealmSetExample>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<RealmSetExample>(this, keyPaths);

  @override
  RealmSetExample freeze() =>
      RealmObjectBase.freezeObject<RealmSetExample>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'primitiveSet': primitiveSet.toEJson(),
      'nullablePrimitiveSet': nullablePrimitiveSet.toEJson(),
      'realmObjectSet': realmObjectSet.toEJson(),
    };
  }

  static EJsonValue _toEJson(RealmSetExample value) => value.toEJson();
  static RealmSetExample _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'primitiveSet': EJsonValue primitiveSet,
        'nullablePrimitiveSet': EJsonValue nullablePrimitiveSet,
        'realmObjectSet': EJsonValue realmObjectSet,
      } =>
        RealmSetExample(
          primitiveSet: fromEJson(primitiveSet),
          nullablePrimitiveSet: fromEJson(nullablePrimitiveSet),
          realmObjectSet: fromEJson(realmObjectSet),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(RealmSetExample._);
    register(_toEJson, _fromEJson);
    return SchemaObject(
        ObjectType.realmObject, RealmSetExample, 'RealmSetExample', [
      SchemaProperty('primitiveSet', RealmPropertyType.string,
          collectionType: RealmCollectionType.set),
      SchemaProperty('nullablePrimitiveSet', RealmPropertyType.int,
          optional: true, collectionType: RealmCollectionType.set),
      SchemaProperty('realmObjectSet', RealmPropertyType.object,
          linkTarget: 'SomeRealmModel',
          collectionType: RealmCollectionType.set),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class SomeRealmModel extends _SomeRealmModel
    with RealmEntity, RealmObjectBase, RealmObject {
  SomeRealmModel(
    ObjectId id,
  ) {
    RealmObjectBase.set(this, 'id', id);
  }

  SomeRealmModel._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  Stream<RealmObjectChanges<SomeRealmModel>> get changes =>
      RealmObjectBase.getChanges<SomeRealmModel>(this);

  @override
  Stream<RealmObjectChanges<SomeRealmModel>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<SomeRealmModel>(this, keyPaths);

  @override
  SomeRealmModel freeze() => RealmObjectBase.freezeObject<SomeRealmModel>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
    };
  }

  static EJsonValue _toEJson(SomeRealmModel value) => value.toEJson();
  static SomeRealmModel _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
      } =>
        SomeRealmModel(
          fromEJson(id),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(SomeRealmModel._);
    register(_toEJson, _fromEJson);
    return SchemaObject(
        ObjectType.realmObject, SomeRealmModel, 'SomeRealmModel', [
      SchemaProperty('id', RealmPropertyType.objectid),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class BinaryExample extends _BinaryExample
    with RealmEntity, RealmObjectBase, RealmObject {
  BinaryExample(
    String name,
    Uint8List requiredBinaryProperty, {
    Uint8List? nullableBinaryProperty,
  }) {
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'requiredBinaryProperty', requiredBinaryProperty);
    RealmObjectBase.set(this, 'nullableBinaryProperty', nullableBinaryProperty);
  }

  BinaryExample._();

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  Uint8List get requiredBinaryProperty =>
      RealmObjectBase.get<Uint8List>(this, 'requiredBinaryProperty')
          as Uint8List;
  @override
  set requiredBinaryProperty(Uint8List value) =>
      RealmObjectBase.set(this, 'requiredBinaryProperty', value);

  @override
  Uint8List? get nullableBinaryProperty =>
      RealmObjectBase.get<Uint8List>(this, 'nullableBinaryProperty')
          as Uint8List?;
  @override
  set nullableBinaryProperty(Uint8List? value) =>
      RealmObjectBase.set(this, 'nullableBinaryProperty', value);

  @override
  Stream<RealmObjectChanges<BinaryExample>> get changes =>
      RealmObjectBase.getChanges<BinaryExample>(this);

  @override
  Stream<RealmObjectChanges<BinaryExample>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<BinaryExample>(this, keyPaths);

  @override
  BinaryExample freeze() => RealmObjectBase.freezeObject<BinaryExample>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'name': name.toEJson(),
      'requiredBinaryProperty': requiredBinaryProperty.toEJson(),
      'nullableBinaryProperty': nullableBinaryProperty.toEJson(),
    };
  }

  static EJsonValue _toEJson(BinaryExample value) => value.toEJson();
  static BinaryExample _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'name': EJsonValue name,
        'requiredBinaryProperty': EJsonValue requiredBinaryProperty,
        'nullableBinaryProperty': EJsonValue nullableBinaryProperty,
      } =>
        BinaryExample(
          fromEJson(name),
          fromEJson(requiredBinaryProperty),
          nullableBinaryProperty: fromEJson(nullableBinaryProperty),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(BinaryExample._);
    register(_toEJson, _fromEJson);
    return SchemaObject(
        ObjectType.realmObject, BinaryExample, 'BinaryExample', [
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('requiredBinaryProperty', RealmPropertyType.binary),
      SchemaProperty('nullableBinaryProperty', RealmPropertyType.binary,
          optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class MapExample extends _MapExample
    with RealmEntity, RealmObjectBase, RealmObject {
  MapExample({
    Map<String, int> map = const {},
    Map<String, int?> nullableMap = const {},
  }) {
    RealmObjectBase.set<RealmMap<int>>(this, 'map', RealmMap<int>(map));
    RealmObjectBase.set<RealmMap<int?>>(
        this, 'nullableMap', RealmMap<int?>(nullableMap));
  }

  MapExample._();

  @override
  RealmMap<int> get map =>
      RealmObjectBase.get<int>(this, 'map') as RealmMap<int>;
  @override
  set map(covariant RealmMap<int> value) => throw RealmUnsupportedSetError();

  @override
  RealmMap<int?> get nullableMap =>
      RealmObjectBase.get<int?>(this, 'nullableMap') as RealmMap<int?>;
  @override
  set nullableMap(covariant RealmMap<int?> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<MapExample>> get changes =>
      RealmObjectBase.getChanges<MapExample>(this);

  @override
  Stream<RealmObjectChanges<MapExample>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<MapExample>(this, keyPaths);

  @override
  MapExample freeze() => RealmObjectBase.freezeObject<MapExample>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'map': map.toEJson(),
      'nullableMap': nullableMap.toEJson(),
    };
  }

  static EJsonValue _toEJson(MapExample value) => value.toEJson();
  static MapExample _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'map': EJsonValue map,
        'nullableMap': EJsonValue nullableMap,
      } =>
        MapExample(
          map: fromEJson(map),
          nullableMap: fromEJson(nullableMap),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(MapExample._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, MapExample, 'MapExample', [
      SchemaProperty('map', RealmPropertyType.int,
          collectionType: RealmCollectionType.map),
      SchemaProperty('nullableMap', RealmPropertyType.int,
          optional: true, collectionType: RealmCollectionType.map),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
