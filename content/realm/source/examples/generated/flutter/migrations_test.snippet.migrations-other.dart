final configWithChanges = Configuration.local([Person.schema, Car.schema],
    schemaVersion: 2,
    migrationCallback: ((migration, oldSchemaVersion) {
  // Dynamic query for all Persons in previous schema
  final oldPeople = migration.oldRealm.all('Person');
  for (final oldPerson in oldPeople) {
    // Find Person instance in the updated realm
    final newPerson = migration.findInNewRealm<Person>(oldPerson);
    if (newPerson == null) {
      // That person must have been deleted, so nothing to do.
      continue;
    }
    // Use dynamic API to get properties from old schema and use in the
    // new schema
    newPerson.fullName = "${oldPerson.dynamic.get<String>("firstName")} ${oldPerson.dynamic.get<String>("lastName")}";
    // convert `id` from ObjectId to String
    final oldId = oldPerson.dynamic.get<ObjectId>("id");
    newPerson.id = oldId.toString();
  }
}));
final realmWithChanges = Realm(configWithChanges);
