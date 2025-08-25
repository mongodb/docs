@interface LinkIdentitiesExample : NSObject
@end

@implementation LinkIdentitiesExample {
    RLMApp *app;
    RLMUser *anonymousUser;
}

// Entry-point for example.
- (void)runExample {
    app = [RLMApp appWithId:YOUR_APP_ID];
    [self logInAnonymously];
}

- (void)logInAnonymously {
    [app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to log in: %@", [error localizedDescription]);
            return;
        }

        // User uses app, then later registers an account
        [self registerNewAccountAsAnonymousUser: user];
    }];
}

- (void)registerNewAccountAsAnonymousUser:(RLMUser *)user {    
    NSString *email = @"link2@example.com";
    NSString *password = @"ganondorf";
    [[app emailPasswordAuth] registerUserWithEmail:email password:password completion:^(NSError *error) { 
            if (error != nil) {
                NSLog(@"Failed to register new account: %@", [error localizedDescription]);
                return;
            }

            // Successfully created account, now link it
            // with the existing anon user
            [self linkUser:self->anonymousUser withCredentials:[RLMCredentials credentialsWithEmail:email password:password]];     
    }];
}

- (void)linkUser:(RLMUser *)user withCredentials:(RLMCredentials *)credentials {
    [[app currentUser] linkUserWithCredentials:credentials completion:^(RLMUser *user, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to link user: %@", [error localizedDescription]);
            return;
        }

        NSLog(@"Successfully linked user: %@", user);
        
    }];
}

@end 
