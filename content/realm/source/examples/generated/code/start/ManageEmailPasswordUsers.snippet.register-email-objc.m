RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
RLMEmailPasswordAuth *client = [app emailPasswordAuth];
NSString *email = @"skroob2@example.com";
NSString *password = @"password12345";
[client registerUserWithEmail:email password:password completion:^(NSError *error) {
    if (error != nil) {
        NSLog(@"Failed to register: %@", [error localizedDescription]);
        return;
    }
    // Registering just registers. You can now log in.
    NSLog(@"Successfully registered user.");
}];
