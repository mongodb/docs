@RealmModel()
class _RealmValueExample {
  @Indexed()
  late RealmValue singleAnyValue;
  late List<RealmValue> listOfMixedAnyValues;
  late Set<RealmValue> setOfMixedAnyValues;
  late Map<String, RealmValue> mapOfMixedAnyValues;
}
