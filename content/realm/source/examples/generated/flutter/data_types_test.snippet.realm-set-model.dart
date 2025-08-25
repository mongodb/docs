@RealmModel()
class _RealmSetExample {
  late Set<String> primitiveSet;
  late Set<int?> nullablePrimitiveSet;
  late Set<_SomeRealmModel> realmObjectSet;
}

@RealmModel()
class _SomeRealmModel {
  late ObjectId id;
}
