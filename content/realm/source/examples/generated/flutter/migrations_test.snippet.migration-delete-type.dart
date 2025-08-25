final configWithoutPerson = Configuration.local([Car.schema],
    schemaVersion: 2,
    migrationCallback: ((migration, oldSchemaVersion) {
  // Between v1 and v2 we removed the Person type
  migration.deleteType('Person');
}));
final realmWithoutPerson = Realm(configWithoutPerson);
