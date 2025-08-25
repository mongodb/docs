#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface ManageApiKeys : XCTestCase

@end

@implementation ManageApiKeys

- (void)setUp {
    XCTestExpectation *expectation = [self expectationWithDescription:@"registers and logs in"];

    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID]; // Replace YOUR_REALM_APP_ID with your Realm app ID
    RLMEmailPasswordAuth *client = [app emailPasswordAuth];
    NSString *email = @"manage-api-keys-objc@example.com";
    NSString *password = @"123456";
    // User will be deleted by TestSetup after entire suite
    [client registerUserWithEmail:email password:password completion:^(NSError *error) {
        // Ignore error. May have registered on previous test.
        [app loginWithCredential:[RLMCredentials credentialsWithEmail:email password:password] completion:^(RLMUser *user, NSError *error) {
                [expectation fulfill];
            }];
    }];
    [self waitForExpectations:@[expectation] timeout:10.0];
}

- (void)tearDown {
    XCTestExpectation *expectation = [self expectationWithDescription:@"Log out"];
    [[[MyRealmApp app] currentUser] logOutWithCompletion:^(NSError *error) {
        [expectation fulfill];
    }];
    [self waitForExpectations:@[expectation] timeout:10.0];
}

- (void)testCreateApiKey {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];
    // :snippet-start: create-api-key
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    // ... log in ...
    RLMUser *user = [app currentUser];
    RLMAPIKeyAuth *client = [user apiKeysAuth];

    // Create the API key
    [client createAPIKeyWithName:@"someKeyName" completion:^(RLMUserAPIKey *apiKey, NSError *error) {
        if (error != nil) {
            // ... handle Error ...
        } else {
            // ... use apiKey ...
            // :remove-start:
            [client deleteAPIKey:[apiKey objectId] completion:^(NSError *error) {
                [expectation fulfill];
            }];
            // :remove-end:
        }
    }];
    // :snippet-end:
    [self waitForExpectations:@[expectation] timeout:10.0];
}

- (void)testLookUpApiKey {
    XCTestExpectation *fetchOneExpectation = [self expectationWithDescription:@"fetch one completes"];
    XCTestExpectation *fetchAllExpectation = [self expectationWithDescription:@"fetch all completes"];
    // :snippet-start: look-up-api-key
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    // ... log in ...
    RLMUser *user = [app currentUser];
    RLMAPIKeyAuth *client = [user apiKeysAuth];

    // Fetch API key by a specific ObjectId
    NSError *error = nil;
    RLMObjectId *objectId = [[RLMObjectId alloc] initWithString:@"someObjectId" error:&error];
    [client fetchAPIKey:objectId completion:^(RLMUserAPIKey *apiKey, NSError *error) {
       if (error != nil) {
          // ... handle error ...
       } else {
          // ... use apiKey ...
       }
       // :remove-start:
       [fetchOneExpectation fulfill];
       // :remove-end:
    }];

    // Fetch all API keys
    [client fetchAPIKeysWithCompletion:^(NSArray<RLMUserAPIKey *> *keys, NSError *error) {
       if (error != nil) {
          // ... handle error ...
       } else {
          for (RLMUserAPIKey *key in keys) {
                // ... use key ...
          }
       }
       // :remove-start:
       [fetchAllExpectation fulfill];
       // :remove-end:
    }];
    // :snippet-end:
    [self waitForExpectations:@[fetchOneExpectation, fetchAllExpectation] timeout:10.0];
}

- (void)testEnableDisableApiKey {
    XCTestExpectation *enableExpectation = [self expectationWithDescription:@"enable completes"];
    XCTestExpectation *disableExpectation = [self expectationWithDescription:@"disable completes"];
    // :snippet-start: enable-disable-api-key
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    // ... log in ...
    RLMUser *user = [app currentUser];
    RLMAPIKeyAuth *client = [user apiKeysAuth];
    
    // Enable the API key with specific objectId
    RLMObjectId *objectId = [[RLMObjectId alloc] initWithString:@"00112233445566778899aabb" error:nil];
    [client enableAPIKey:objectId completion:^(NSError *error) {
       // Handle error if any. Otherwise, enable was successful.
       // :remove-start:
       [enableExpectation fulfill];
       // :remove-end:
    }];
    
    RLMUserAPIKey *apiKey;

    // ... Get an API key ...
    // :remove-start:
    apiKey = [[RLMUserAPIKey alloc] init];
    // :remove-end:

    // Disable the API key
    [client disableAPIKey:[apiKey objectId] completion:^(NSError *error) {
       // Handle error if any. Otherwise, disable was successful.
       // :remove-start:
       [disableExpectation fulfill];
       // :remove-end:
    }];
    // :snippet-end:
    [self waitForExpectations:@[enableExpectation, disableExpectation] timeout:10.0];
}

- (void)testDeleteApiKey {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];
    // :snippet-start: delete-api-key
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    // ... log in ...
    RLMUser *user = [app currentUser];
    RLMAPIKeyAuth *client = [user apiKeysAuth];
    
    RLMUserAPIKey *apiKey;

    // ... Get an API key ...
    // :remove-start:
    apiKey = [[RLMUserAPIKey alloc] init];
    // :remove-end:

    [client deleteAPIKey:[apiKey objectId] completion:^(NSError *error) {
       // Handle error if any. Otherwise, delete was successful.
       // :remove-start:
       [expectation fulfill];
       // :remove-end:
    }];
    // :snippet-end:
    [self waitForExpectations:@[expectation] timeout:10.0];
}

@end
