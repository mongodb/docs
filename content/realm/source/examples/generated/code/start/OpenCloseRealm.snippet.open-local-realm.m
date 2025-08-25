// Open the default realm
RLMRealm *defaultRealm = [RLMRealm defaultRealm];

// Open the realm with a specific file URL, for example a username
NSString *username = @"GordonCole";
RLMRealmConfiguration *configuration = [RLMRealmConfiguration defaultConfiguration];
configuration.fileURL = [[[configuration.fileURL URLByDeletingLastPathComponent]
                         URLByAppendingPathComponent:username]
                         URLByAppendingPathExtension:@"realm"];
NSError *error = nil;
RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration
                                             error:&error];
