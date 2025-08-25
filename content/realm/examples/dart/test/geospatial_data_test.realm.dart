// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'geospatial_data_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class MyGeoPoint extends _MyGeoPoint
    with RealmEntity, RealmObjectBase, EmbeddedObject {
  static var _defaultsSet = false;

  MyGeoPoint({
    String type = 'Point',
    Iterable<double> coordinates = const [],
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<MyGeoPoint>({
        'type': 'Point',
      });
    }
    RealmObjectBase.set(this, 'type', type);
    RealmObjectBase.set<RealmList<double>>(
        this, 'coordinates', RealmList<double>(coordinates));
  }

  MyGeoPoint._();

  @override
  String get type => RealmObjectBase.get<String>(this, 'type') as String;

  @override
  RealmList<double> get coordinates =>
      RealmObjectBase.get<double>(this, 'coordinates') as RealmList<double>;
  @override
  set coordinates(covariant RealmList<double> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<MyGeoPoint>> get changes =>
      RealmObjectBase.getChanges<MyGeoPoint>(this);

  @override
  Stream<RealmObjectChanges<MyGeoPoint>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<MyGeoPoint>(this, keyPaths);

  @override
  MyGeoPoint freeze() => RealmObjectBase.freezeObject<MyGeoPoint>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'type': type.toEJson(),
      'coordinates': coordinates.toEJson(),
    };
  }

  static EJsonValue _toEJson(MyGeoPoint value) => value.toEJson();
  static MyGeoPoint _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'type': EJsonValue type,
        'coordinates': EJsonValue coordinates,
      } =>
        MyGeoPoint(
          type: fromEJson(type),
          coordinates: fromEJson(coordinates),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(MyGeoPoint._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.embeddedObject, MyGeoPoint, 'MyGeoPoint', [
      SchemaProperty('type', RealmPropertyType.string),
      SchemaProperty('coordinates', RealmPropertyType.double,
          collectionType: RealmCollectionType.list),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Company extends _Company with RealmEntity, RealmObjectBase, RealmObject {
  Company(
    ObjectId id, {
    MyGeoPoint? location,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'location', location);
  }

  Company._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  MyGeoPoint? get location =>
      RealmObjectBase.get<MyGeoPoint>(this, 'location') as MyGeoPoint?;
  @override
  set location(covariant MyGeoPoint? value) =>
      RealmObjectBase.set(this, 'location', value);

  @override
  Stream<RealmObjectChanges<Company>> get changes =>
      RealmObjectBase.getChanges<Company>(this);

  @override
  Stream<RealmObjectChanges<Company>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Company>(this, keyPaths);

  @override
  Company freeze() => RealmObjectBase.freezeObject<Company>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'location': location.toEJson(),
    };
  }

  static EJsonValue _toEJson(Company value) => value.toEJson();
  static Company _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'location': EJsonValue location,
      } =>
        Company(
          fromEJson(id),
          location: fromEJson(location),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Company._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Company, 'Company', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('location', RealmPropertyType.object,
          optional: true, linkTarget: 'MyGeoPoint'),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
