// When you open the realm, specify that the schema
// is now using a newer version.
RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
// Set the new schema version
config.schemaVersion = 2;
// Use this configuration when opening realms
[RLMRealmConfiguration setDefaultConfiguration:config];
RLMRealm *realm = [RLMRealm defaultRealm];
