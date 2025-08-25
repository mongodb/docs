RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
RLMEmailPasswordAuth *client = [app emailPasswordAuth];

// Token and tokenId are query parameters in the confirmation
// link sent in the confirmation email.
NSString *token = @"someToken";
NSString *tokenId = @"someTokenId";

[client confirmUser:token tokenId:tokenId completion:^(NSError *error) {
   if (error != nil) {
       NSLog(@"User confirmation failed: %@", [error localizedDescription]);
       return;
   }
   // User confirmed
   NSLog(@"Successfully confirmed user.");
}];
