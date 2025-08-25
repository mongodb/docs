// Create in-memory realm and add data to it.
// Note that even though the realm is in-memory, it still has a file path.
// This is because in-memory realms still use memory-mapped files
// for their operations; they just don't persist data across launches.
final inMemoryRealm =
    Realm(Configuration.inMemory([Person.schema], path: 'inMemory.realm'));
inMemoryRealm.write(() {
  inMemoryRealm.addAll([Person("Tanya"), Person("Greg"), Person("Portia")]);
});

// Copy contents of `inMemoryRealm` to a new realm with `localConfig`.
// `localConfig` uses the default file path for local realms.
final localConfig = Configuration.local([Person.schema]);
inMemoryRealm.writeCopy(localConfig);
// Close the realm you just copied when you're done working with it.
inMemoryRealm.close();

// Open the local realm that the data from `inMemoryRealm`
// was just copied to with `localConfig`.
final localRealm = Realm(localConfig);

// Person object for "Tanya" is in `localRealm` because
// the data was copied over with `inMemoryRealm.writeCopy()`.
final tanya = localRealm.find<Person>("Tanya");
