RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
[app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
    if (error != nil) {
        NSLog(@"Failed to log in: %@", error);
        return;
    }
    RLMMongoClient *client = [user mongoClientWithServiceName:@"mongodb-atlas"];
    RLMMongoDatabase *database = [client databaseWithName:@"my_database"];
    RLMMongoCollection *collection = [database collectionWithName:@"users"];
    [collection insertOneDocument:
        @{@"userId": [user identifier], @"favoriteColor": @"pink"}
        completion:^(id<RLMBSON> newObjectId, NSError *error) {
            if (error != nil) {
                NSLog(@"Failed to insert: %@", error);
            }
            NSLog(@"Inserted custom user data document with object ID: %@", newObjectId);
    }];
}];
