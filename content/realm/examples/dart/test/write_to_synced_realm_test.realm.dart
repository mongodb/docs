// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'write_to_synced_realm_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Car extends _Car with RealmEntity, RealmObjectBase, RealmObject {
  Car(
    ObjectId id,
    String ownerId,
    String make, {
    String? model,
    int? miles,
  }) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'ownerId', ownerId);
    RealmObjectBase.set(this, 'make', make);
    RealmObjectBase.set(this, 'model', model);
    RealmObjectBase.set(this, 'miles', miles);
  }

  Car._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get ownerId => RealmObjectBase.get<String>(this, 'ownerId') as String;
  @override
  set ownerId(String value) => RealmObjectBase.set(this, 'ownerId', value);

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
      '_id': id.toEJson(),
      'ownerId': ownerId.toEJson(),
      'make': make.toEJson(),
      'model': model.toEJson(),
      'miles': miles.toEJson(),
    };
  }

  static EJsonValue _toEJson(Car value) => value.toEJson();
  static Car _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
        'ownerId': EJsonValue ownerId,
        'make': EJsonValue make,
        'model': EJsonValue model,
        'miles': EJsonValue miles,
      } =>
        Car(
          fromEJson(id),
          fromEJson(ownerId),
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
      SchemaProperty('id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('ownerId', RealmPropertyType.string),
      SchemaProperty('make', RealmPropertyType.string),
      SchemaProperty('model', RealmPropertyType.string, optional: true),
      SchemaProperty('miles', RealmPropertyType.int, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
