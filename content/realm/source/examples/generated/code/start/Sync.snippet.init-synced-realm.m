RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];

// Log in...

RLMUser *user = [app currentUser];
NSString *partitionValue = @"some partition value";

RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:partitionValue];

NSError *error = nil;
RLMRealm *realm = [RLMRealm realmWithConfiguration:configuration
                                             error:&error];

if (error != nil) {
    NSLog(@"Failed to open realm: %@", [error localizedDescription]);
    // handle error
} else {
    NSLog(@"Opened realm: %@", realm);
    // Use realm
}
