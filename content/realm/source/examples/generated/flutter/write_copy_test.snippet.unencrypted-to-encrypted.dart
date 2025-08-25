// Create unencrypted realm and add data to it.
final unencryptedRealm = Realm(Configuration.local([Person.schema]));
unencryptedRealm.write(() => unencryptedRealm.addAll([
      Person("Daphne"),
      Person("Harper"),
      Person("Ethan"),
      Person("Cameron")
    ]));

// Create encryption key and encrypted realm.
final key = List<int>.generate(64, (i) => Random().nextInt(256));
final encryptedConfig = Configuration.local([Person.schema],
    path: 'encrypted.realm', encryptionKey: key);
// Copy the data from `unencryptedRealm` to a new realm with
// the `encryptedConfig`. The data is encrypted as part of the copying.
unencryptedRealm.writeCopy(encryptedConfig);
// Close the realm you just copied when you're done working with it.
unencryptedRealm.close();

// Open the new encrypted realm with `encryptedConfig`.
final encryptedRealm = Realm(encryptedConfig);

// Person object for "Harper" is in `localRealm` because
// the data was copied over with `unencryptedRealm.writeCopy()`.
final harper = encryptedRealm.find<Person>('Harper');
