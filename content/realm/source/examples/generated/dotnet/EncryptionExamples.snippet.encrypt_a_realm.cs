// Check if we already have a key stored in the platform's secure storage.
// If we don't, generate a new one:
var encryptionKey = new byte[64];
using var rng = RandomNumberGenerator.Create();
rng.GetBytes(encryptionKey);

// Store the key securely to be used next time we want to open the Realm.

// Create configuration.
var config = new RealmConfiguration
{
    EncryptionKey = encryptionKey
};

// Open or create a realm with the encryption key.
var realm = Realm.GetInstance(config);
