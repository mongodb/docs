for (var obj in data) {
  for (var mixedValue in obj.listOfMixedAnyValues) {
    // Use RealmValue.value to access the value
    final value = mixedValue.value;
    if (value is int) {
      sum = sum + value;
    } else if (value is String) {
      combinedStrings += value;
    }

    // Use RealmValue.as<T> to cast value to a specific type
    try {
      final intValue = mixedValue.as<int>();
      sum = sum + intValue;
    } catch (e) {
      log('Error casting value to int: $e');
    }
  }
}
