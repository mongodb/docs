// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pet.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Pet extends _Pet with RealmEntity, RealmObjectBase, RealmObject {
  Pet(
    String type,
    int numberOfLegs,
    DateTime birthDate, {
    double? price,
  }) {
    RealmObjectBase.set(this, 'type', type);
    RealmObjectBase.set(this, 'numberOfLegs', numberOfLegs);
    RealmObjectBase.set(this, 'birthDate', birthDate);
    RealmObjectBase.set(this, 'price', price);
  }

  Pet._();

  @override
  String get type => RealmObjectBase.get<String>(this, 'type') as String;
  @override
  set type(String value) => RealmObjectBase.set(this, 'type', value);

  @override
  int get numberOfLegs => RealmObjectBase.get<int>(this, 'numberOfLegs') as int;
  @override
  set numberOfLegs(int value) =>
      RealmObjectBase.set(this, 'numberOfLegs', value);

  @override
  DateTime get birthDate =>
      RealmObjectBase.get<DateTime>(this, 'birthDate') as DateTime;
  @override
  set birthDate(DateTime value) =>
      RealmObjectBase.set(this, 'birthDate', value);

  @override
  double? get price => RealmObjectBase.get<double>(this, 'price') as double?;
  @override
  set price(double? value) => RealmObjectBase.set(this, 'price', value);

  @override
  Stream<RealmObjectChanges<Pet>> get changes =>
      RealmObjectBase.getChanges<Pet>(this);

  @override
  Stream<RealmObjectChanges<Pet>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Pet>(this, keyPaths);

  @override
  Pet freeze() => RealmObjectBase.freezeObject<Pet>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'type': type.toEJson(),
      'numberOfLegs': numberOfLegs.toEJson(),
      'birthDate': birthDate.toEJson(),
      'price': price.toEJson(),
    };
  }

  static EJsonValue _toEJson(Pet value) => value.toEJson();
  static Pet _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'type': EJsonValue type,
        'numberOfLegs': EJsonValue numberOfLegs,
        'birthDate': EJsonValue birthDate,
        'price': EJsonValue price,
      } =>
        Pet(
          fromEJson(type),
          fromEJson(numberOfLegs),
          fromEJson(birthDate),
          price: fromEJson(price),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Pet._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Pet, 'Pet', [
      SchemaProperty('type', RealmPropertyType.string),
      SchemaProperty('numberOfLegs', RealmPropertyType.int),
      SchemaProperty('birthDate', RealmPropertyType.timestamp),
      SchemaProperty('price', RealmPropertyType.double, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
