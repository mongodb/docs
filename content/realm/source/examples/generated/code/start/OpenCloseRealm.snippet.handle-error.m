NSError *error = nil;
RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
RLMRealm *realm = [RLMRealm realmWithConfiguration:config error:&error];
if (!realm) {
    // Handle error
    return;
}
// Use realm
