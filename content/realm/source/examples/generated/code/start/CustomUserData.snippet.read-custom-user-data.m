RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
[app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
    if (error != nil) {
        NSLog(@"Failed to log in: %@", error);
        return;
    }
    
    // If the user data has been refreshed recently, you can access the
    // custom user data directly on the user object
    NSLog(@"User custom data: %@", [user customData]);
    
    // Refresh the custom data
    [user refreshCustomDataWithCompletion:^(NSDictionary *customData, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to refresh custom user data: %@", error);
            return;
        }
        NSLog(@"Favorite color: %@", customData[@"favoriteColor"]);
    }];
}];
