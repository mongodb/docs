// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'migrations_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class PersonV2 extends _PersonV2
    with RealmEntity, RealmObjectBase, RealmObject {
  PersonV2(
    String id,
    String fullName, {
    int? yearsSinceBirth,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'fullName', fullName);
    RealmObjectBase.set(this, 'yearsSinceBirth', yearsSinceBirth);
  }

  PersonV2._();

  @override
  String get id => RealmObjectBase.get<String>(this, 'id') as String;
  @override
  set id(String value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get fullName =>
      RealmObjectBase.get<String>(this, 'fullName') as String;
  @override
  set fullName(String value) => RealmObjectBase.set(this, 'fullName', value);

  @override
  int? get yearsSinceBirth =>
      RealmObjectBase.get<int>(this, 'yearsSinceBirth') as int?;
  @override
  set yearsSinceBirth(int? value) =>
      RealmObjectBase.set(this, 'yearsSinceBirth', value);

  @override
  Stream<RealmObjectChanges<PersonV2>> get changes =>
      RealmObjectBase.getChanges<PersonV2>(this);

  @override
  Stream<RealmObjectChanges<PersonV2>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<PersonV2>(this, keyPaths);

  @override
  PersonV2 freeze() => RealmObjectBase.freezeObject<PersonV2>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'fullName': fullName.toEJson(),
      'yearsSinceBirth': yearsSinceBirth.toEJson(),
    };
  }

  static EJsonValue _toEJson(PersonV2 value) => value.toEJson();
  static PersonV2 _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'fullName': EJsonValue fullName,
        'yearsSinceBirth': EJsonValue yearsSinceBirth,
      } =>
        PersonV2(
          fromEJson(id),
          fromEJson(fullName),
          yearsSinceBirth: fromEJson(yearsSinceBirth),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(PersonV2._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, PersonV2, 'Person', [
      SchemaProperty('id', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('fullName', RealmPropertyType.string),
      SchemaProperty('yearsSinceBirth', RealmPropertyType.int, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
