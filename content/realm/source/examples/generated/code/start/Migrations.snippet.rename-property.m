RLMRealmConfiguration *config = [[RLMRealmConfiguration alloc] init];
config.schemaVersion = 2;
config.migrationBlock = ^(RLMMigration * _Nonnull migration, uint64_t oldSchemaVersion) {
    if (oldSchemaVersion < 2) {
        // Rename the "age" property to "yearsSinceBirth".
        // The renaming operation should be done outside of calls to `enumerateObjects(ofType: _:)`.
        [migration renamePropertyForClass:[Person className] oldName:@"age" newName:@"yearsSinceBirth"];
    }
};
