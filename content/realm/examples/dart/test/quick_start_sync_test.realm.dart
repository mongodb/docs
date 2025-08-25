// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'quick_start_sync_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Todo extends _Todo with RealmEntity, RealmObjectBase, RealmObject {
  static var _defaultsSet = false;

  Todo(
    ObjectId id,
    String summary,
    String ownerId, {
    bool isComplete = false,
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<Todo>({
        'isComplete': false,
      });
    }
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'isComplete', isComplete);
    RealmObjectBase.set(this, 'summary', summary);
    RealmObjectBase.set(this, 'owner_id', ownerId);
  }

  Todo._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, '_id', value);

  @override
  bool get isComplete => RealmObjectBase.get<bool>(this, 'isComplete') as bool;
  @override
  set isComplete(bool value) => RealmObjectBase.set(this, 'isComplete', value);

  @override
  String get summary => RealmObjectBase.get<String>(this, 'summary') as String;
  @override
  set summary(String value) => RealmObjectBase.set(this, 'summary', value);

  @override
  String get ownerId => RealmObjectBase.get<String>(this, 'owner_id') as String;
  @override
  set ownerId(String value) => RealmObjectBase.set(this, 'owner_id', value);

  @override
  Stream<RealmObjectChanges<Todo>> get changes =>
      RealmObjectBase.getChanges<Todo>(this);

  @override
  Stream<RealmObjectChanges<Todo>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Todo>(this, keyPaths);

  @override
  Todo freeze() => RealmObjectBase.freezeObject<Todo>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      '_id': id.toEJson(),
      'isComplete': isComplete.toEJson(),
      'summary': summary.toEJson(),
      'owner_id': ownerId.toEJson(),
    };
  }

  static EJsonValue _toEJson(Todo value) => value.toEJson();
  static Todo _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
        'isComplete': EJsonValue isComplete,
        'summary': EJsonValue summary,
        'owner_id': EJsonValue ownerId,
      } =>
        Todo(
          fromEJson(id),
          fromEJson(summary),
          fromEJson(ownerId),
          isComplete: fromEJson(isComplete),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Todo._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Todo, 'Todo', [
      SchemaProperty('id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('isComplete', RealmPropertyType.bool),
      SchemaProperty('summary', RealmPropertyType.string),
      SchemaProperty('ownerId', RealmPropertyType.string, mapTo: 'owner_id'),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
