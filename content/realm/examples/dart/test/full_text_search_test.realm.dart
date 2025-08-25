// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'full_text_search_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Rug extends _Rug with RealmEntity, RealmObjectBase, RealmObject {
  Rug(
    ObjectId id,
    String pattern,
    String material,
    int softness,
  ) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'pattern', pattern);
    RealmObjectBase.set(this, 'material', material);
    RealmObjectBase.set(this, 'softness', softness);
  }

  Rug._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get pattern => RealmObjectBase.get<String>(this, 'pattern') as String;
  @override
  set pattern(String value) => RealmObjectBase.set(this, 'pattern', value);

  @override
  String get material =>
      RealmObjectBase.get<String>(this, 'material') as String;
  @override
  set material(String value) => RealmObjectBase.set(this, 'material', value);

  @override
  int get softness => RealmObjectBase.get<int>(this, 'softness') as int;
  @override
  set softness(int value) => RealmObjectBase.set(this, 'softness', value);

  @override
  Stream<RealmObjectChanges<Rug>> get changes =>
      RealmObjectBase.getChanges<Rug>(this);

  @override
  Stream<RealmObjectChanges<Rug>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Rug>(this, keyPaths);

  @override
  Rug freeze() => RealmObjectBase.freezeObject<Rug>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'pattern': pattern.toEJson(),
      'material': material.toEJson(),
      'softness': softness.toEJson(),
    };
  }

  static EJsonValue _toEJson(Rug value) => value.toEJson();
  static Rug _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'pattern': EJsonValue pattern,
        'material': EJsonValue material,
        'softness': EJsonValue softness,
      } =>
        Rug(
          fromEJson(id),
          fromEJson(pattern),
          fromEJson(material),
          fromEJson(softness),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Rug._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.realmObject, Rug, 'Rug', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('pattern', RealmPropertyType.string,
          indexType: RealmIndexType.fullText),
      SchemaProperty('material', RealmPropertyType.string,
          indexType: RealmIndexType.fullText),
      SchemaProperty('softness', RealmPropertyType.int),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
