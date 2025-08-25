final data = realm.all<RealmValueExample>();
for (var obj in data) {
  final anyValue = obj.singleAnyValue;
  // Access the RealmValue.type property
  switch (anyValue.type) {
    // Work with the returned RealmValueType enums
    case RealmValueType.int:
      approximateAge = DateTime.now().year - anyValue.as<int>();
      break;
    case RealmValueType.dateTime:
      approximateAge =
          (DateTime.now().difference(anyValue.as<DateTime>()).inDays /
                  365)
              .floor();
      break;
    case RealmValueType.string:
      final birthday = DateTime.parse(anyValue.as<String>());
      approximateAge =
          (DateTime.now().difference(birthday).inDays / 365).floor();
      break;
    // Handle other possible types ...
    default:
      log('Unhandled type: ${anyValue.type}');
  }
}
