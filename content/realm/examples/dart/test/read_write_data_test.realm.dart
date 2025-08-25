// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'read_write_data_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Person extends _Person with RealmEntity, RealmObjectBase, RealmObject {
  Person(
    ObjectId id,
    String name, {
    Iterable<String> hobbies = const [],
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set<RealmList<String>>(
        this, 'hobbies', RealmList<String>(hobbies));
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
  RealmList<String> get hobbies =>
      RealmObjectBase.get<String>(this, 'hobbies') as RealmList<String>;
  @override
  set hobbies(covariant RealmList<String> value) =>
      throw RealmUnsupportedSetError();

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
      'hobbies': hobbies.toEJson(),
    };
  }

  static EJsonValue _toEJson(Person value) => value.toEJson();
  static Person _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'hobbies': EJsonValue hobbies,
      } =>
        Person(
          fromEJson(id),
          fromEJson(name),
          hobbies: fromEJson(hobbies),
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
      SchemaProperty('hobbies', RealmPropertyType.string,
          collectionType: RealmCollectionType.list),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Team extends _Team with RealmEntity, RealmObjectBase, RealmObject {
  Team(
    ObjectId id,
    String name, {
    Iterable<Person> crew = const [],
    RealmValue eventLog = const RealmValue.nullValue(),
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set<RealmList<Person>>(
        this, 'crew', RealmList<Person>(crew));
    RealmObjectBase.set(this, 'eventLog', eventLog);
  }

  Team._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  RealmList<Person> get crew =>
      RealmObjectBase.get<Person>(this, 'crew') as RealmList<Person>;
  @override
  set crew(covariant RealmList<Person> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmValue get eventLog =>
      RealmObjectBase.get<RealmValue>(this, 'eventLog') as RealmValue;
  @override
  set eventLog(RealmValue value) =>
      RealmObjectBase.set(this, 'eventLog', value);

  @override
  Stream<RealmObjectChanges<Team>> get changes =>
      RealmObjectBase.getChanges<Team>(this);

  @override
  Stream<RealmObjectChanges<Team>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Team>(this, keyPaths);

  @override
  Team freeze() => RealmObjectBase.freezeObject<Team>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'name': name.toEJson(),
      'crew': crew.toEJson(),
      'eventLog': eventLog.toEJson(),
    };
  }

  static EJsonValue _toEJson(Team value) => value.toEJson();
  static Team _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'name': EJsonValue name,
        'crew': EJsonValue crew,
        'eventLog': EJsonValue eventLog,
      } =>
        Team(
          fromEJson(id),
          fromEJson(name),
          crew: fromEJson(crew),
          eventLog: fromEJson(eventLog),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Team._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Team, 'Team', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('crew', RealmPropertyType.object,
          linkTarget: 'Person', collectionType: RealmCollectionType.list),
      SchemaProperty('eventLog', RealmPropertyType.mixed, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
