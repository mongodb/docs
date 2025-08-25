// Generate encryption key
final key = List<int>.generate(64, (i) => Random().nextInt(256));

final encryptedConfig = Configuration.local([Car.schema],
    // Include the encryption key in the configuration
    encryptionKey: key);
final encryptedRealm = Realm(encryptedConfig);
