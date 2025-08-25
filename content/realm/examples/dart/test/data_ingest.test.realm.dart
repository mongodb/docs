// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'data_ingest.test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class WeatherSensor extends _WeatherSensor
    with RealmEntity, RealmObjectBase, AsymmetricObject {
  WeatherSensor(
    ObjectId id,
    String deviceId,
    double modtemperatureInFahrenheitel,
    double barometricPressureInHg,
    double windSpeedInMph,
  ) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'deviceId', deviceId);
    RealmObjectBase.set(
        this, 'modtemperatureInFahrenheitel', modtemperatureInFahrenheitel);
    RealmObjectBase.set(this, 'barometricPressureInHg', barometricPressureInHg);
    RealmObjectBase.set(this, 'windSpeedInMph', windSpeedInMph);
  }

  WeatherSensor._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get deviceId =>
      RealmObjectBase.get<String>(this, 'deviceId') as String;
  @override
  set deviceId(String value) => RealmObjectBase.set(this, 'deviceId', value);

  @override
  double get modtemperatureInFahrenheitel =>
      RealmObjectBase.get<double>(this, 'modtemperatureInFahrenheitel')
          as double;
  @override
  set modtemperatureInFahrenheitel(double value) =>
      RealmObjectBase.set(this, 'modtemperatureInFahrenheitel', value);

  @override
  double get barometricPressureInHg =>
      RealmObjectBase.get<double>(this, 'barometricPressureInHg') as double;
  @override
  set barometricPressureInHg(double value) =>
      RealmObjectBase.set(this, 'barometricPressureInHg', value);

  @override
  double get windSpeedInMph =>
      RealmObjectBase.get<double>(this, 'windSpeedInMph') as double;
  @override
  set windSpeedInMph(double value) =>
      RealmObjectBase.set(this, 'windSpeedInMph', value);

  @override
  Stream<RealmObjectChanges<WeatherSensor>> get changes =>
      RealmObjectBase.getChanges<WeatherSensor>(this);

  @override
  Stream<RealmObjectChanges<WeatherSensor>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<WeatherSensor>(this, keyPaths);

  @override
  WeatherSensor freeze() => RealmObjectBase.freezeObject<WeatherSensor>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      '_id': id.toEJson(),
      'deviceId': deviceId.toEJson(),
      'modtemperatureInFahrenheitel': modtemperatureInFahrenheitel.toEJson(),
      'barometricPressureInHg': barometricPressureInHg.toEJson(),
      'windSpeedInMph': windSpeedInMph.toEJson(),
    };
  }

  static EJsonValue _toEJson(WeatherSensor value) => value.toEJson();
  static WeatherSensor _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
        'deviceId': EJsonValue deviceId,
        'modtemperatureInFahrenheitel': EJsonValue modtemperatureInFahrenheitel,
        'barometricPressureInHg': EJsonValue barometricPressureInHg,
        'windSpeedInMph': EJsonValue windSpeedInMph,
      } =>
        WeatherSensor(
          fromEJson(id),
          fromEJson(deviceId),
          fromEJson(modtemperatureInFahrenheitel),
          fromEJson(barometricPressureInHg),
          fromEJson(windSpeedInMph),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(WeatherSensor._);
    register(_toEJson, _fromEJson);
    return SchemaObject(
        ObjectType.asymmetricObject, WeatherSensor, 'WeatherSensor', [
      SchemaProperty('id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('deviceId', RealmPropertyType.string),
      SchemaProperty('modtemperatureInFahrenheitel', RealmPropertyType.double),
      SchemaProperty('barometricPressureInHg', RealmPropertyType.double),
      SchemaProperty('windSpeedInMph', RealmPropertyType.double),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
