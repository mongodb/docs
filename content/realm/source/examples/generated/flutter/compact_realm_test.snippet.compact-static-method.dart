final config = Configuration.local([Car.schema]);

final compacted = Realm.compact(config);
print(
    "Successfully compacted the realm: $compacted"); // On success, this prints "true"

final realm = Realm(config);
