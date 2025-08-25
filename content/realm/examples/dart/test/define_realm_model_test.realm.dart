// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'define_realm_model_test.dart';

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

class Person extends _Person with RealmEntity, RealmObjectBase, RealmObject {
  Person(
    String firstName,
    String lastName,
    int age,
  ) {
    RealmObjectBase.set(this, 'firstName', firstName);
    RealmObjectBase.set(this, 'lastName', lastName);
    RealmObjectBase.set(this, 'age', age);
  }

  Person._();

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
  int get age => RealmObjectBase.get<int>(this, 'age') as int;
  @override
  set age(int value) => RealmObjectBase.set(this, 'age', value);

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
      'firstName': firstName.toEJson(),
      'lastName': lastName.toEJson(),
      'age': age.toEJson(),
    };
  }

  static EJsonValue _toEJson(Person value) => value.toEJson();
  static Person _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'firstName': EJsonValue firstName,
        'lastName': EJsonValue lastName,
        'age': EJsonValue age,
      } =>
        Person(
          fromEJson(firstName),
          fromEJson(lastName),
          fromEJson(age),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Person._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Person, 'Person', [
      SchemaProperty('firstName', RealmPropertyType.string),
      SchemaProperty('lastName', RealmPropertyType.string),
      SchemaProperty('age', RealmPropertyType.int),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Boat extends _Boat with RealmEntity, RealmObjectBase, RealmObject {
  Boat(
    ObjectId id,
    String name, {
    int? maxKnots,
    int? nauticalMiles,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'maxKnots', maxKnots);
    RealmObjectBase.set(this, 'nauticalMiles', nauticalMiles);
  }

  Boat._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  int? get maxKnots => RealmObjectBase.get<int>(this, 'maxKnots') as int?;
  @override
  set maxKnots(int? value) => RealmObjectBase.set(this, 'maxKnots', value);

  @override
  int? get nauticalMiles =>
      RealmObjectBase.get<int>(this, 'nauticalMiles') as int?;
  @override
  set nauticalMiles(int? value) =>
      RealmObjectBase.set(this, 'nauticalMiles', value);

  @override
  Stream<RealmObjectChanges<Boat>> get changes =>
      RealmObjectBase.getChanges<Boat>(this);

  @override
  Stream<RealmObjectChanges<Boat>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Boat>(this, keyPaths);

  @override
  Boat freeze() => RealmObjectBase.freezeObject<Boat>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'maxKnots': maxKnots.toEJson(),
      'nauticalMiles': nauticalMiles.toEJson(),
    };
  }

  static EJsonValue _toEJson(Boat value) => value.toEJson();
  static Boat _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'maxKnots': EJsonValue maxKnots,
        'nauticalMiles': EJsonValue nauticalMiles,
      } =>
        Boat(
          fromEJson(id),
          fromEJson(name),
          maxKnots: fromEJson(maxKnots),
          nauticalMiles: fromEJson(nauticalMiles),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Boat._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Boat, 'naval_ship', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('maxKnots', RealmPropertyType.int, optional: true),
      SchemaProperty('nauticalMiles', RealmPropertyType.int, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class EventLog extends _EventLog
    with RealmEntity, RealmObjectBase, RealmObject {
  EventLog(
    ObjectId id,
    String eventType,
    DateTime timestamp,
    String userId, {
    RealmValue details = const RealmValue.nullValue(),
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'eventType', eventType);
    RealmObjectBase.set(this, 'timestamp', timestamp);
    RealmObjectBase.set(this, 'userId', userId);
    RealmObjectBase.set(this, 'details', details);
  }

  EventLog._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get eventType =>
      RealmObjectBase.get<String>(this, 'eventType') as String;
  @override
  set eventType(String value) => RealmObjectBase.set(this, 'eventType', value);

  @override
  DateTime get timestamp =>
      RealmObjectBase.get<DateTime>(this, 'timestamp') as DateTime;
  @override
  set timestamp(DateTime value) =>
      RealmObjectBase.set(this, 'timestamp', value);

  @override
  String get userId => RealmObjectBase.get<String>(this, 'userId') as String;
  @override
  set userId(String value) => RealmObjectBase.set(this, 'userId', value);

  @override
  RealmValue get details =>
      RealmObjectBase.get<RealmValue>(this, 'details') as RealmValue;
  @override
  set details(RealmValue value) => RealmObjectBase.set(this, 'details', value);

  @override
  Stream<RealmObjectChanges<EventLog>> get changes =>
      RealmObjectBase.getChanges<EventLog>(this);

  @override
  Stream<RealmObjectChanges<EventLog>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<EventLog>(this, keyPaths);

  @override
  EventLog freeze() => RealmObjectBase.freezeObject<EventLog>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'eventType': eventType.toEJson(),
      'timestamp': timestamp.toEJson(),
      'userId': userId.toEJson(),
      'details': details.toEJson(),
    };
  }

  static EJsonValue _toEJson(EventLog value) => value.toEJson();
  static EventLog _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'eventType': EJsonValue eventType,
        'timestamp': EJsonValue timestamp,
        'userId': EJsonValue userId,
        'details': EJsonValue details,
      } =>
        EventLog(
          fromEJson(id),
          fromEJson(eventType),
          fromEJson(timestamp),
          fromEJson(userId),
          details: fromEJson(details),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(EventLog._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, EventLog, 'EventLog', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('eventType', RealmPropertyType.string),
      SchemaProperty('timestamp', RealmPropertyType.timestamp),
      SchemaProperty('userId', RealmPropertyType.string),
      SchemaProperty('details', RealmPropertyType.mixed, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
