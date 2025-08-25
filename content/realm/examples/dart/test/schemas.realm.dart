// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'schemas.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Car extends _Car with RealmEntity, RealmObjectBase, RealmObject {
  Car(
    ObjectId id,
    String make, {
    String? model,
    int? miles,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'make', make);
    RealmObjectBase.set(this, 'model', model);
    RealmObjectBase.set(this, 'miles', miles);
  }

  Car._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get make => RealmObjectBase.get<String>(this, 'make') as String;
  @override
  set make(String value) => RealmObjectBase.set(this, 'make', value);

  @override
  String? get model => RealmObjectBase.get<String>(this, 'model') as String?;
  @override
  set model(String? value) => RealmObjectBase.set(this, 'model', value);

  @override
  int? get miles => RealmObjectBase.get<int>(this, 'miles') as int?;
  @override
  set miles(int? value) => RealmObjectBase.set(this, 'miles', value);

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
      'make': make.toEJson(),
      'model': model.toEJson(),
      'miles': miles.toEJson(),
    };
  }

  static EJsonValue _toEJson(Car value) => value.toEJson();
  static Car _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'make': EJsonValue make,
        'model': EJsonValue model,
        'miles': EJsonValue miles,
      } =>
        Car(
          fromEJson(id),
          fromEJson(make),
          model: fromEJson(model),
          miles: fromEJson(miles),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Car._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Car, 'Car', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('make', RealmPropertyType.string),
      SchemaProperty('model', RealmPropertyType.string, optional: true),
      SchemaProperty('miles', RealmPropertyType.int, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class SyncSchema extends _SyncSchema
    with RealmEntity, RealmObjectBase, RealmObject {
  SyncSchema(
    ObjectId id,
  ) {
    RealmObjectBase.set(this, '_id', id);
  }

  SyncSchema._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, '_id', value);

  @override
  Stream<RealmObjectChanges<SyncSchema>> get changes =>
      RealmObjectBase.getChanges<SyncSchema>(this);

  @override
  Stream<RealmObjectChanges<SyncSchema>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<SyncSchema>(this, keyPaths);

  @override
  SyncSchema freeze() => RealmObjectBase.freezeObject<SyncSchema>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      '_id': id.toEJson(),
    };
  }

  static EJsonValue _toEJson(SyncSchema value) => value.toEJson();
  static SyncSchema _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
      } =>
        SyncSchema(
          fromEJson(id),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(SyncSchema._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, SyncSchema, 'SyncSchema', [
      SchemaProperty('id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Bike extends _Bike with RealmEntity, RealmObjectBase, RealmObject {
  Bike(
    ObjectId id,
    String name, {
    Person? owner,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'owner', owner);
  }

  Bike._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  Person? get owner => RealmObjectBase.get<Person>(this, 'owner') as Person?;
  @override
  set owner(covariant Person? value) =>
      RealmObjectBase.set(this, 'owner', value);

  @override
  Stream<RealmObjectChanges<Bike>> get changes =>
      RealmObjectBase.getChanges<Bike>(this);

  @override
  Stream<RealmObjectChanges<Bike>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Bike>(this, keyPaths);

  @override
  Bike freeze() => RealmObjectBase.freezeObject<Bike>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'owner': owner.toEJson(),
    };
  }

  static EJsonValue _toEJson(Bike value) => value.toEJson();
  static Bike _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'owner': EJsonValue owner,
      } =>
        Bike(
          fromEJson(id),
          fromEJson(name),
          owner: fromEJson(owner),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Bike._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Bike, 'Bike', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('owner', RealmPropertyType.object,
          optional: true, linkTarget: 'Person'),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Person extends _Person with RealmEntity, RealmObjectBase, RealmObject {
  Person(
    ObjectId id,
    String firstName,
    String lastName, {
    int? age,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'firstName', firstName);
    RealmObjectBase.set(this, 'lastName', lastName);
    RealmObjectBase.set(this, 'age', age);
  }

  Person._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get firstName =>
      RealmObjectBase.get<String>(this, 'firstName') as String;
  @override
  set firstName(String value) => RealmObjectBase.set(this, 'firstName', value);

  @override
  String get lastName =>
      RealmObjectBase.get<String>(this, 'lastName') as String;
  @override
  set lastName(String value) => RealmObjectBase.set(this, 'lastName', value);

  @override
  int? get age => RealmObjectBase.get<int>(this, 'age') as int?;
  @override
  set age(int? value) => RealmObjectBase.set(this, 'age', value);

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
      'firstName': firstName.toEJson(),
      'lastName': lastName.toEJson(),
      'age': age.toEJson(),
    };
  }

  static EJsonValue _toEJson(Person value) => value.toEJson();
  static Person _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'firstName': EJsonValue firstName,
        'lastName': EJsonValue lastName,
        'age': EJsonValue age,
      } =>
        Person(
          fromEJson(id),
          fromEJson(firstName),
          fromEJson(lastName),
          age: fromEJson(age),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Person._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Person, 'Person', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('firstName', RealmPropertyType.string),
      SchemaProperty('lastName', RealmPropertyType.string),
      SchemaProperty('age', RealmPropertyType.int, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Scooter extends _Scooter with RealmEntity, RealmObjectBase, RealmObject {
  Scooter(
    ObjectId id,
    String name, {
    Person? owner,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'owner', owner);
  }

  Scooter._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  Person? get owner => RealmObjectBase.get<Person>(this, 'owner') as Person?;
  @override
  set owner(covariant Person? value) =>
      RealmObjectBase.set(this, 'owner', value);

  @override
  Stream<RealmObjectChanges<Scooter>> get changes =>
      RealmObjectBase.getChanges<Scooter>(this);

  @override
  Stream<RealmObjectChanges<Scooter>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Scooter>(this, keyPaths);

  @override
  Scooter freeze() => RealmObjectBase.freezeObject<Scooter>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'owner': owner.toEJson(),
    };
  }

  static EJsonValue _toEJson(Scooter value) => value.toEJson();
  static Scooter _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'owner': EJsonValue owner,
      } =>
        Scooter(
          fromEJson(id),
          fromEJson(name),
          owner: fromEJson(owner),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Scooter._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Scooter, 'Scooter', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('owner', RealmPropertyType.object,
          optional: true, linkTarget: 'Person'),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class ScooterShop extends _ScooterShop
    with RealmEntity, RealmObjectBase, RealmObject {
  ScooterShop(
    ObjectId id,
    String name, {
    Iterable<Scooter> scooters = const [],
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set<RealmList<Scooter>>(
        this, 'scooters', RealmList<Scooter>(scooters));
  }

  ScooterShop._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  RealmList<Scooter> get scooters =>
      RealmObjectBase.get<Scooter>(this, 'scooters') as RealmList<Scooter>;
  @override
  set scooters(covariant RealmList<Scooter> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<ScooterShop>> get changes =>
      RealmObjectBase.getChanges<ScooterShop>(this);

  @override
  Stream<RealmObjectChanges<ScooterShop>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<ScooterShop>(this, keyPaths);

  @override
  ScooterShop freeze() => RealmObjectBase.freezeObject<ScooterShop>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'scooters': scooters.toEJson(),
    };
  }

  static EJsonValue _toEJson(ScooterShop value) => value.toEJson();
  static ScooterShop _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'scooters': EJsonValue scooters,
      } =>
        ScooterShop(
          fromEJson(id),
          fromEJson(name),
          scooters: fromEJson(scooters),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(ScooterShop._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, ScooterShop, 'ScooterShop', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('scooters', RealmPropertyType.object,
          linkTarget: 'Scooter', collectionType: RealmCollectionType.list),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
