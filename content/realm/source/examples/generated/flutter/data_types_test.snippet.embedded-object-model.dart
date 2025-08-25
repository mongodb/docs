// The generated `Address` class is an embedded object.
@RealmModel(ObjectType.embeddedObject)
class _Address {
  late String street;
  late String city;
  late String state;
  late String country;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late ObjectId id;

  late String name;

  // Embedded object in parent object schema
  late _Address? address; // Must be nullable
}
