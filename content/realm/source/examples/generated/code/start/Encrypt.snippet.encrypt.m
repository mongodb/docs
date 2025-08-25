// Generate a random encryption key
NSMutableData *key = [NSMutableData dataWithLength:64];
(void)SecRandomCopyBytes(kSecRandomDefault, key.length, (uint8_t *)key.mutableBytes);

// Open the encrypted Realm file
RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
config.encryptionKey = key;

NSError *error = nil;
RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];
if (!realm) {
    // If the encryption key is wrong, `error` will say that it's an invalid database
    NSLog(@"Error opening realm: %@", error);
} else {
    // Use the realm as normal...
}
