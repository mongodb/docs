// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task_project_models_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Project extends _Project with RealmEntity, RealmObjectBase, RealmObject {
  Project(
    ObjectId id,
    String name, {
    Iterable<Item> items = const [],
    int? quota,
  }) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set<RealmList<Item>>(this, 'items', RealmList<Item>(items));
    RealmObjectBase.set(this, 'quota', quota);
  }

  Project._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  RealmList<Item> get items =>
      RealmObjectBase.get<Item>(this, 'items') as RealmList<Item>;
  @override
  set items(covariant RealmList<Item> value) =>
      throw RealmUnsupportedSetError();

  @override
  int? get quota => RealmObjectBase.get<int>(this, 'quota') as int?;
  @override
  set quota(int? value) => RealmObjectBase.set(this, 'quota', value);

  @override
  Stream<RealmObjectChanges<Project>> get changes =>
      RealmObjectBase.getChanges<Project>(this);

  @override
  Stream<RealmObjectChanges<Project>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Project>(this, keyPaths);

  @override
  Project freeze() => RealmObjectBase.freezeObject<Project>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      '_id': id.toEJson(),
      'name': name.toEJson(),
      'items': items.toEJson(),
      'quota': quota.toEJson(),
    };
  }

  static EJsonValue _toEJson(Project value) => value.toEJson();
  static Project _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
        'name': EJsonValue name,
        'items': EJsonValue items,
        'quota': EJsonValue quota,
      } =>
        Project(
          fromEJson(id),
          fromEJson(name),
          items: fromEJson(items),
          quota: fromEJson(quota),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Project._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Project, 'Project', [
      SchemaProperty('id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('items', RealmPropertyType.object,
          linkTarget: 'Item', collectionType: RealmCollectionType.list),
      SchemaProperty('quota', RealmPropertyType.int, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class Item extends _Item with RealmEntity, RealmObjectBase, RealmObject {
  static var _defaultsSet = false;

  Item(
    ObjectId id,
    String name, {
    bool isComplete = false,
    String? assignee,
    int priority = 0,
    int progressMinutes = 0,
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<Item>({
        'isComplete': false,
        'priority': 0,
        'progressMinutes': 0,
      });
    }
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'isComplete', isComplete);
    RealmObjectBase.set(this, 'assignee', assignee);
    RealmObjectBase.set(this, 'priority', priority);
    RealmObjectBase.set(this, 'progressMinutes', progressMinutes);
  }

  Item._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  bool get isComplete => RealmObjectBase.get<bool>(this, 'isComplete') as bool;
  @override
  set isComplete(bool value) => RealmObjectBase.set(this, 'isComplete', value);

  @override
  String? get assignee =>
      RealmObjectBase.get<String>(this, 'assignee') as String?;
  @override
  set assignee(String? value) => RealmObjectBase.set(this, 'assignee', value);

  @override
  int get priority => RealmObjectBase.get<int>(this, 'priority') as int;
  @override
  set priority(int value) => RealmObjectBase.set(this, 'priority', value);

  @override
  int get progressMinutes =>
      RealmObjectBase.get<int>(this, 'progressMinutes') as int;
  @override
  set progressMinutes(int value) =>
      RealmObjectBase.set(this, 'progressMinutes', value);

  @override
  Stream<RealmObjectChanges<Item>> get changes =>
      RealmObjectBase.getChanges<Item>(this);

  @override
  Stream<RealmObjectChanges<Item>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Item>(this, keyPaths);

  @override
  Item freeze() => RealmObjectBase.freezeObject<Item>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      '_id': id.toEJson(),
      'name': name.toEJson(),
      'isComplete': isComplete.toEJson(),
      'assignee': assignee.toEJson(),
      'priority': priority.toEJson(),
      'progressMinutes': progressMinutes.toEJson(),
    };
  }

  static EJsonValue _toEJson(Item value) => value.toEJson();
  static Item _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        '_id': EJsonValue id,
        'name': EJsonValue name,
        'isComplete': EJsonValue isComplete,
        'assignee': EJsonValue assignee,
        'priority': EJsonValue priority,
        'progressMinutes': EJsonValue progressMinutes,
      } =>
        Item(
          fromEJson(id),
          fromEJson(name),
          isComplete: fromEJson(isComplete),
          assignee: fromEJson(assignee),
          priority: fromEJson(priority),
          progressMinutes: fromEJson(progressMinutes),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Item._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Item, 'Item', [
      SchemaProperty('id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string,
          indexType: RealmIndexType.fullText),
      SchemaProperty('isComplete', RealmPropertyType.bool),
      SchemaProperty('assignee', RealmPropertyType.string, optional: true),
      SchemaProperty('priority', RealmPropertyType.int),
      SchemaProperty('progressMinutes', RealmPropertyType.int),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
