RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
// Set the new schema version
config.schemaVersion = 2;
config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
    if (oldSchemaVersion < 2) {
        // Iterate over every 'Person' object stored in the Realm file to
        // apply the migration
        [migration enumerateObjects:[Person className]
                            block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
            // Combine name fields into a single field
            newObject[@"fullName"] = [NSString stringWithFormat:@"%@ %@",
                                        oldObject[@"firstName"],
                                        oldObject[@"lastName"]];
        }];
    }
};

// Tell Realm to use this new configuration object for the default Realm
[RLMRealmConfiguration setDefaultConfiguration:config];

// Now that we've told Realm how to handle the schema change, opening the realm
// will automatically perform the migration
RLMRealm *realm = [RLMRealm defaultRealm];
