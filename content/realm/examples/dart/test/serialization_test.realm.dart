// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'serialization_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Address extends _Address
    with RealmEntity, RealmObjectBase, EmbeddedObject {
  Address(
    String street,
    String city,
    String state,
    String country,
  ) {
    RealmObjectBase.set(this, 'street', street);
    RealmObjectBase.set(this, 'city', city);
    RealmObjectBase.set(this, 'state', state);
    RealmObjectBase.set(this, 'country', country);
  }

  Address._();

  @override
  String get street => RealmObjectBase.get<String>(this, 'street') as String;
  @override
  set street(String value) => RealmObjectBase.set(this, 'street', value);

  @override
  String get city => RealmObjectBase.get<String>(this, 'city') as String;
  @override
  set city(String value) => RealmObjectBase.set(this, 'city', value);

  @override
  String get state => RealmObjectBase.get<String>(this, 'state') as String;
  @override
  set state(String value) => RealmObjectBase.set(this, 'state', value);

  @override
  String get country => RealmObjectBase.get<String>(this, 'country') as String;
  @override
  set country(String value) => RealmObjectBase.set(this, 'country', value);

  @override
  Stream<RealmObjectChanges<Address>> get changes =>
      RealmObjectBase.getChanges<Address>(this);

  @override
  Stream<RealmObjectChanges<Address>> changesFor([List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<Address>(this, keyPaths);

  @override
  Address freeze() => RealmObjectBase.freezeObject<Address>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'street': street.toEJson(),
      'city': city.toEJson(),
      'state': state.toEJson(),
      'country': country.toEJson(),
    };
  }

  static EJsonValue _toEJson(Address value) => value.toEJson();
  static Address _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'street': EJsonValue street,
        'city': EJsonValue city,
        'state': EJsonValue state,
        'country': EJsonValue country,
      } =>
        Address(
          fromEJson(street),
          fromEJson(city),
          fromEJson(state),
          fromEJson(country),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(Address._);
    register(_toEJson, _fromEJson);
    return SchemaObject(ObjectType.embeddedObject, Address, 'Address', [
      SchemaProperty('street', RealmPropertyType.string),
      SchemaProperty('city', RealmPropertyType.string),
      SchemaProperty('state', RealmPropertyType.string),
      SchemaProperty('country', RealmPropertyType.string),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}

class SerializeModel extends _SerializeModel
    with RealmEntity, RealmObjectBase, RealmObject {
  static var _defaultsSet = false;

  SerializeModel(
    ObjectId id,
    Uuid myId,
    Uint8List requiredBinaryProperty,
    DateTime dateLastServiced,
    String licensePlate, {
    Iterable<String> listOfStrings = const [],
    Set<int> setOfInts = const {},
    Map<String, int> mapOfMixedAnyValues = const {},
    bool isElectric = false,
    Address? address,
    double milesDriven = 126.0,
    int number32 = 900,
    int number64 = 922393736854775807,
    int? a,
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<SerializeModel>({
        'isElectric': false,
        'milesDriven': 126.0,
        'number32': 900,
        'number64': 922393736854775807,
      });
    }
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'myId', myId);
    RealmObjectBase.set<RealmList<String>>(
        this, 'listOfStrings', RealmList<String>(listOfStrings));
    RealmObjectBase.set<RealmSet<int>>(
        this, 'setOfInts', RealmSet<int>(setOfInts));
    RealmObjectBase.set<RealmMap<int>>(
        this, 'mapOfMixedAnyValues', RealmMap<int>(mapOfMixedAnyValues));
    RealmObjectBase.set(this, 'requiredBinaryProperty', requiredBinaryProperty);
    RealmObjectBase.set(this, 'isElectric', isElectric);
    RealmObjectBase.set(this, 'dateLastServiced', dateLastServiced);
    RealmObjectBase.set(this, 'address', address);
    RealmObjectBase.set(this, 'milesDriven', milesDriven);
    RealmObjectBase.set(this, 'number32', number32);
    RealmObjectBase.set(this, 'number64', number64);
    RealmObjectBase.set(this, 'licensePlate', licensePlate);
    RealmObjectBase.set(this, 'a', a);
  }

  SerializeModel._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  Uuid get myId => RealmObjectBase.get<Uuid>(this, 'myId') as Uuid;
  @override
  set myId(Uuid value) => RealmObjectBase.set(this, 'myId', value);

  @override
  RealmList<String> get listOfStrings =>
      RealmObjectBase.get<String>(this, 'listOfStrings') as RealmList<String>;
  @override
  set listOfStrings(covariant RealmList<String> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmSet<int> get setOfInts =>
      RealmObjectBase.get<int>(this, 'setOfInts') as RealmSet<int>;
  @override
  set setOfInts(covariant RealmSet<int> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmMap<int> get mapOfMixedAnyValues =>
      RealmObjectBase.get<int>(this, 'mapOfMixedAnyValues') as RealmMap<int>;
  @override
  set mapOfMixedAnyValues(covariant RealmMap<int> value) =>
      throw RealmUnsupportedSetError();

  @override
  Uint8List get requiredBinaryProperty =>
      RealmObjectBase.get<Uint8List>(this, 'requiredBinaryProperty')
          as Uint8List;
  @override
  set requiredBinaryProperty(Uint8List value) =>
      RealmObjectBase.set(this, 'requiredBinaryProperty', value);

  @override
  bool get isElectric => RealmObjectBase.get<bool>(this, 'isElectric') as bool;
  @override
  set isElectric(bool value) => RealmObjectBase.set(this, 'isElectric', value);

  @override
  DateTime get dateLastServiced =>
      RealmObjectBase.get<DateTime>(this, 'dateLastServiced') as DateTime;
  @override
  set dateLastServiced(DateTime value) =>
      RealmObjectBase.set(this, 'dateLastServiced', value);

  @override
  Address? get address =>
      RealmObjectBase.get<Address>(this, 'address') as Address?;
  @override
  set address(covariant Address? value) =>
      RealmObjectBase.set(this, 'address', value);

  @override
  double get milesDriven =>
      RealmObjectBase.get<double>(this, 'milesDriven') as double;
  @override
  set milesDriven(double value) =>
      RealmObjectBase.set(this, 'milesDriven', value);

  @override
  int get number32 => RealmObjectBase.get<int>(this, 'number32') as int;
  @override
  set number32(int value) => RealmObjectBase.set(this, 'number32', value);

  @override
  int get number64 => RealmObjectBase.get<int>(this, 'number64') as int;
  @override
  set number64(int value) => RealmObjectBase.set(this, 'number64', value);

  @override
  String get licensePlate =>
      RealmObjectBase.get<String>(this, 'licensePlate') as String;
  @override
  set licensePlate(String value) =>
      RealmObjectBase.set(this, 'licensePlate', value);

  @override
  int? get a => RealmObjectBase.get<int>(this, 'a') as int?;
  @override
  set a(int? value) => RealmObjectBase.set(this, 'a', value);

  @override
  Stream<RealmObjectChanges<SerializeModel>> get changes =>
      RealmObjectBase.getChanges<SerializeModel>(this);

  @override
  Stream<RealmObjectChanges<SerializeModel>> changesFor(
          [List<String>? keyPaths]) =>
      RealmObjectBase.getChangesFor<SerializeModel>(this, keyPaths);

  @override
  SerializeModel freeze() => RealmObjectBase.freezeObject<SerializeModel>(this);

  EJsonValue toEJson() {
    return <String, dynamic>{
      'id': id.toEJson(),
      'myId': myId.toEJson(),
      'listOfStrings': listOfStrings.toEJson(),
      'setOfInts': setOfInts.toEJson(),
      'mapOfMixedAnyValues': mapOfMixedAnyValues.toEJson(),
      'requiredBinaryProperty': requiredBinaryProperty.toEJson(),
      'isElectric': isElectric.toEJson(),
      'dateLastServiced': dateLastServiced.toEJson(),
      'address': address.toEJson(),
      'milesDriven': milesDriven.toEJson(),
      'number32': number32.toEJson(),
      'number64': number64.toEJson(),
      'licensePlate': licensePlate.toEJson(),
      'a': a.toEJson(),
    };
  }

  static EJsonValue _toEJson(SerializeModel value) => value.toEJson();
  static SerializeModel _fromEJson(EJsonValue ejson) {
    return switch (ejson) {
      {
        'id': EJsonValue id,
        'myId': EJsonValue myId,
        'listOfStrings': EJsonValue listOfStrings,
        'setOfInts': EJsonValue setOfInts,
        'mapOfMixedAnyValues': EJsonValue mapOfMixedAnyValues,
        'requiredBinaryProperty': EJsonValue requiredBinaryProperty,
        'isElectric': EJsonValue isElectric,
        'dateLastServiced': EJsonValue dateLastServiced,
        'address': EJsonValue address,
        'milesDriven': EJsonValue milesDriven,
        'number32': EJsonValue number32,
        'number64': EJsonValue number64,
        'licensePlate': EJsonValue licensePlate,
        'a': EJsonValue a,
      } =>
        SerializeModel(
          fromEJson(id),
          fromEJson(myId),
          fromEJson(requiredBinaryProperty),
          fromEJson(dateLastServiced),
          fromEJson(licensePlate),
          listOfStrings: fromEJson(listOfStrings),
          setOfInts: fromEJson(setOfInts),
          mapOfMixedAnyValues: fromEJson(mapOfMixedAnyValues),
          isElectric: fromEJson(isElectric),
          address: fromEJson(address),
          milesDriven: fromEJson(milesDriven),
          number32: fromEJson(number32),
          number64: fromEJson(number64),
          a: fromEJson(a),
        ),
      _ => raiseInvalidEJson(ejson),
    };
  }

  static final schema = () {
    RealmObjectBase.registerFactory(SerializeModel._);
    register(_toEJson, _fromEJson);
    return SchemaObject(
        ObjectType.realmObject, SerializeModel, 'SerializeModel', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('myId', RealmPropertyType.uuid),
      SchemaProperty('listOfStrings', RealmPropertyType.string,
          collectionType: RealmCollectionType.list),
      SchemaProperty('setOfInts', RealmPropertyType.int,
          collectionType: RealmCollectionType.set),
      SchemaProperty('mapOfMixedAnyValues', RealmPropertyType.int,
          collectionType: RealmCollectionType.map),
      SchemaProperty('requiredBinaryProperty', RealmPropertyType.binary),
      SchemaProperty('isElectric', RealmPropertyType.bool),
      SchemaProperty('dateLastServiced', RealmPropertyType.timestamp),
      SchemaProperty('address', RealmPropertyType.object,
          optional: true, linkTarget: 'Address'),
      SchemaProperty('milesDriven', RealmPropertyType.double),
      SchemaProperty('number32', RealmPropertyType.int),
      SchemaProperty('number64', RealmPropertyType.int),
      SchemaProperty('licensePlate', RealmPropertyType.string),
      SchemaProperty('a', RealmPropertyType.int, optional: true),
    ]);
  }();

  @override
  SchemaObject get objectSchema => RealmObjectBase.getSchema(this) ?? schema;
}
