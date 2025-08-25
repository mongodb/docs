RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
RLMEmailPasswordAuth *client = [app emailPasswordAuth];

// If Realm app password reset mode is "Send a password reset email",
// we can do so here:
NSString *email = @"forgot.my.password@example.com";
[client sendResetPasswordEmail:email completion:^(NSError *error) {
   if (error != nil) {
       NSLog(@"Failed to send reset password email: %@", [error localizedDescription]);
       return;
   }
   // Email sent.
   NSLog(@"Successfully sent reset password email.");
}];

// Later...

NSString *newPassword = @"mynewpassword12345";

// Token and tokenId are query parameters in the confirmation
// link sent in the reset password email.
NSString *token = @"someToken";
NSString *tokenId = @"someTokenId";

[client resetPasswordTo:newPassword token:token tokenId:tokenId completion:^(NSError *error) {
    if (error != nil) {
        NSLog(@"Failed to reset password: %@", [error localizedDescription]);
        return;
    }
    // Password reset.
    NSLog(@"Successfully reset password.");
}];

