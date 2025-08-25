// Open the realm with a specific in-memory identifier.
NSString *identifier = @"MyRealm";
RLMRealmConfiguration *configuration = [[RLMRealmConfiguration alloc] init];
configuration.inMemoryIdentifier = identifier;
// Open the realm
RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration error:nil];
