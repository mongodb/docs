#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"

@interface CustomUserDataObjc : XCTestCase

@end

@implementation CustomUserDataObjc

// This test is currently failing with Thread Foo: signal SIGABRT
// and a message to report as a Core error. Temporarily disabling until we can investigate.
- (void)testCreateCustomUserData {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];

    // :snippet-start: create-custom-user-data
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
                // :remove-start:
                XCTAssertNotNil(newObjectId);
                [expectation fulfill];
                // :remove-end:
        }];
    }];
    // :snippet-end:

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testReadCustomUserData {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];

    // :snippet-start: read-custom-user-data
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
            // :remove-start:
            [expectation fulfill];
            // :remove-end:
        }];
    }];
    // :snippet-end:

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

// This test is currently failing with Thread Foo: signal SIGABRT
// and a message to report as a Core error. Temporarily disabling until we can investigate.
- (void)testUpdateCustomUserData {
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];

    // :snippet-start: update-custom-user-data
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    [app loginWithCredential:[RLMCredentials anonymousCredentials] completion:^(RLMUser *user, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to log in: %@", error);
            return;
        }
        RLMMongoClient *client = [user mongoClientWithServiceName:@"mongodb-atlas"];
        RLMMongoDatabase *database = [client databaseWithName:@"my_database"];
        RLMMongoCollection *collection = [database collectionWithName:@"users"];
        // :remove-start:
        [collection insertOneDocument:
            @{@"userId": [user identifier], @"favoriteColor": @"pink"}
            completion:^(id<RLMBSON> newObjectId, NSError *error) {
                if (error != nil) {
                    NSLog(@"Failed to insert: %@", error);
                }
                NSLog(@"Inserted custom user data document with object ID: %@", newObjectId);
                // :remove-start:
                XCTAssertNotNil(newObjectId);
                // :remove-end:
        }];
        sleep(5);
        // :remove-end:

        // Update the user's custom data document
        [collection updateOneDocumentWhere:@{@"userId": [user identifier]}
            updateDocument: @{@"favoriteColor": @"cerulean"}
            completion:^(RLMUpdateResult *updateResult, NSError *error) { 
                if (error != nil) {
                    NSLog(@"Failed to insert: %@", error);
                }
                NSLog(@"Matched: %lu, modified: %lu", [updateResult matchedCount], [updateResult modifiedCount]);
                // :remove-start:
                XCTAssertEqual([updateResult matchedCount], 1);
                [expectation fulfill];
                // :remove-end:
        }];
    }];
    // :snippet-end:

    [self waitForExpectationsWithTimeout:10 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

@end
