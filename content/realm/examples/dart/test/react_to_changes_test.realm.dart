// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'react_to_changes_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Character extends _Character
    with RealmEntity, RealmObjectBase, RealmObject {
  Character(
    ObjectId id,
    String name,
    String species,
    int age,
  ) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'species', species);
    RealmObjectBase.set(this, 'age', age);
  }

  Character._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  String get species => RealmObjectBase.get<String>(this, 'species') as String;
  @override
  set species(String value) => RealmObjectBase.set(this, 'species', value);

  @override
  int get age => RealmObjectBase.get<int>(this, 'age') as int;
  @override
  set age(int value) => RealmObjectBase.set(this, 'age', value);

  @override
  Stream<RealmObjectChanges<Character>> get changes =>
      RealmObjectBase.getChanges<Character>(this);

  @override
  Stream<RealmObjectChanges<Character>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Character>(this, keyPaths);

  @override
  Character freeze() => RealmObjectBase.freezeObject<Character>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'species': species.toEJson(),
      'age': age.toEJson(),
    };
  }

  static EJsonValue _toEJson(Character value) => value.toEJson();
  static Character _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'species': EJsonValue species,
        'age': EJsonValue age,
      } =>
        Character(
          fromEJson(id),
          fromEJson(name),
          fromEJson(species),
          fromEJson(age),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Character._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Character, 'Character', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('species', RealmPropertyType.string),
      SchemaProperty('age', RealmPropertyType.int),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Fellowship extends _Fellowship
    with RealmEntity, RealmObjectBase, RealmObject {
  Fellowship(
    ObjectId id,
    String name, {
    Iterable<Character> members = const [],
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set<RealmList<Character>>(
        this, 'members', RealmList<Character>(members));
  }

  Fellowship._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  RealmList<Character> get members =>
      RealmObjectBase.get<Character>(this, 'members') as RealmList<Character>;
  @override
  set members(covariant RealmList<Character> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<Fellowship>> get changes =>
      RealmObjectBase.getChanges<Fellowship>(this);

  @override
  Stream<RealmObjectChanges<Fellowship>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Fellowship>(this, keyPaths);

  @override
  Fellowship freeze() => RealmObjectBase.freezeObject<Fellowship>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'members': members.toEJson(),
    };
  }

  static EJsonValue _toEJson(Fellowship value) => value.toEJson();
  static Fellowship _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'members': EJsonValue members,
      } =>
        Fellowship(
          fromEJson(id),
          fromEJson(name),
          members: fromEJson(members),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Fellowship._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Fellowship, 'Fellowship', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('members', RealmPropertyType.object,
          linkTarget: 'Character', collectionType: RealmCollectionType.list),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
