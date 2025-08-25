// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'manage_sync_subscription_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Plane extends _Plane with RealmEntity, RealmObjectBase, RealmObject {
  Plane(
    int id,
    String name,
    int numSeats,
  ) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'numSeats', numSeats);
  }

  Plane._();

  @override
  int get id => RealmObjectBase.get<int>(this, '_id') as int;
  @override
  set id(int value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  int get numSeats => RealmObjectBase.get<int>(this, 'numSeats') as int;
  @override
  set numSeats(int value) => RealmObjectBase.set(this, 'numSeats', value);

  @override
  Stream<RealmObjectChanges<Plane>> get changes =>
      RealmObjectBase.getChanges<Plane>(this);

  @override
  Stream<RealmObjectChanges<Plane>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Plane>(this, keyPaths);

  @override
  Plane freeze() => RealmObjectBase.freezeObject<Plane>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      '_id': id.toEJson(),
      'name': name.toEJson(),
      'numSeats': numSeats.toEJson(),
    };
  }

  static EJsonValue _toEJson(Plane value) => value.toEJson();
  static Plane _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
        'name': EJsonValue name,
        'numSeats': EJsonValue numSeats,
      } =>
        Plane(
          fromEJson(id),
          fromEJson(name),
          fromEJson(numSeats),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Plane._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Plane, 'Plane', [
      SchemaProperty('id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('numSeats', RealmPropertyType.int),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Train extends _Train with RealmEntity, RealmObjectBase, RealmObject {
  Train(
    int id,
    String name,
    int numCars,
  ) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'numCars', numCars);
  }

  Train._();

  @override
  int get id => RealmObjectBase.get<int>(this, '_id') as int;
  @override
  set id(int value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  int get numCars => RealmObjectBase.get<int>(this, 'numCars') as int;
  @override
  set numCars(int value) => RealmObjectBase.set(this, 'numCars', value);

  @override
  Stream<RealmObjectChanges<Train>> get changes =>
      RealmObjectBase.getChanges<Train>(this);

  @override
  Stream<RealmObjectChanges<Train>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Train>(this, keyPaths);

  @override
  Train freeze() => RealmObjectBase.freezeObject<Train>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      '_id': id.toEJson(),
      'name': name.toEJson(),
      'numCars': numCars.toEJson(),
    };
  }

  static EJsonValue _toEJson(Train value) => value.toEJson();
  static Train _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
        'name': EJsonValue name,
        'numCars': EJsonValue numCars,
      } =>
        Train(
          fromEJson(id),
          fromEJson(name),
          fromEJson(numCars),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Train._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Train, 'Train', [
      SchemaProperty('id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('numCars', RealmPropertyType.int),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Boat extends _Boat with RealmEntity, RealmObjectBase, RealmObject {
  Boat(
    int id,
    String name,
    int tonnage,
  ) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'tonnage', tonnage);
  }

  Boat._();

  @override
  int get id => RealmObjectBase.get<int>(this, '_id') as int;
  @override
  set id(int value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  int get tonnage => RealmObjectBase.get<int>(this, 'tonnage') as int;
  @override
  set tonnage(int value) => RealmObjectBase.set(this, 'tonnage', value);

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
      '_id': id.toEJson(),
      'name': name.toEJson(),
      'tonnage': tonnage.toEJson(),
    };
  }

  static EJsonValue _toEJson(Boat value) => value.toEJson();
  static Boat _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
        'name': EJsonValue name,
        'tonnage': EJsonValue tonnage,
      } =>
        Boat(
          fromEJson(id),
          fromEJson(name),
          fromEJson(tonnage),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Boat._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Boat, 'Boat', [
      SchemaProperty('id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('tonnage', RealmPropertyType.int),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
