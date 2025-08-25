RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
// Set the new schema version
config.schemaVersion = 3;
config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
    if (oldSchemaVersion < 2) {
        // Previous Migration.
        [migration enumerateObjects:[Person className]
                            block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
            newObject[@"fullName"] = [NSString stringWithFormat:@"%@ %@",
                                        oldObject[@"firstName"],
                                        oldObject[@"lastName"]];
        }];
    }
    if (oldSchemaVersion < 3) {
        // New Migration
        [migration enumerateObjects:[Person className]
                            block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
            // Make age a String instead of an Int
            newObject[@"age"] = [oldObject[@"age"] stringValue];
        }];
    }
};

// Tell Realm to use this new configuration object for the default Realm
[RLMRealmConfiguration setDefaultConfiguration:config];

// Now that we've told Realm how to handle the schema change, opening the realm
// will automatically perform the migration
RLMRealm *realm = [RLMRealm defaultRealm];
