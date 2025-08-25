// :replace-start: {
//   "terms": {
//     "SyncObjcExamples_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>
#import "MyRealmApp.h"
#import "AnonymouslyLoggedInTestCase.h"

@interface SyncObjcExamples_Task : RLMObject
@property RLMObjectId *_id;
@property NSString *_partition;
@end

@implementation SyncObjcExamples_Task
+ (NSString *)primaryKey {
    return @"_id";
}

+ (NSArray<NSString *> *)requiredProperties {
    return @[@"_partition"];
}

- (instancetype)init {
    if (self = [super init]) {
        self._id = [RLMObjectId objectId];
        self._partition = @"some partition value";
    }
    return self;
}
@end

@interface SyncObjc : AnonymouslyLoggedInTestCase
@end


// :snippet-start: check-network-connection-setup
@interface MySyncSessionObserver: NSObject
@end

@implementation MySyncSessionObserver
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if (![object isKindOfClass:RLMSyncSession.class]) {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
        return;
    }
    if (![keyPath isEqualToString:@"connectionState"]) {
        // Not interested in observing this keypath
        return;
    }
    RLMSyncSession *syncSession = (RLMSyncSession *)object;
    RLMSyncConnectionState connectionState = [syncSession connectionState];
    switch (connectionState) {
        case RLMSyncConnectionStateConnecting:
            NSLog(@"Connecting...");
            break;
        case RLMSyncConnectionStateConnected:
            NSLog(@"Connected");
            break;
        case RLMSyncConnectionStateDisconnected:
            NSLog(@"Disconnected");
            break;
    }
}
@end
// :snippet-end:

@implementation SyncObjc
- (void)testInitSyncedRealm {
    // :snippet-start: init-synced-realm
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    
    // Log in...

    RLMUser *user = [app currentUser];
    NSString *partitionValue = @"some partition value";

    RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:partitionValue];
    // :remove-start:
    configuration.objectClasses = @[SyncObjcExamples_Task.class];
    // :remove-end:
    
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
    // :snippet-end:
}

- (void)testPauseResumeSyncSession {
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    RLMUser *user = [app currentUser];
    NSString *partitionValue = @"some partition value";
    RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:partitionValue];
    configuration.objectClasses = @[SyncObjcExamples_Task.class];
    
    // :snippet-start: pause-resume-sync-session
    RLMRealm *syncedRealm = [RLMRealm realmWithConfiguration:configuration error:nil];
    
    RLMSyncSession *syncSession = [syncedRealm syncSession];
    // Suspend synchronization
    [syncSession suspend];
    
    // Later, resume synchronization
    [syncSession resume];
    // :snippet-end:
    
    // :snippet-start: check-network-connection
    // Observe connectionState for changes using KVO
    MySyncSessionObserver *observer = [[MySyncSessionObserver alloc] init];
    [syncSession addObserver:observer
                  forKeyPath:@"connectionState"
                     options:NSKeyValueObservingOptionInitial
                     context:nil];
    
    // Later, when done...
    [syncSession removeObserver:observer
                     forKeyPath:@"connectionState"
                        context:nil];

    // :snippet-end:
}

- (void)testCheckProgress {
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    RLMUser *user = [app currentUser];
    NSString *partitionValue = @"some partition value";
    RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:partitionValue];
    configuration.objectClasses = @[SyncObjcExamples_Task.class];
    RLMRealm *syncedRealm = [RLMRealm realmWithConfiguration:configuration error:nil];
    XCTestExpectation *expectation = [self expectationWithDescription:@"it completes"];
    expectation.assertForOverFulfill = NO;
    
    // :snippet-start: check-progress
    RLMSyncSession *syncSession = [syncedRealm syncSession];
    RLMProgressNotificationToken *token = [syncSession
                                           addSyncProgressNotificationForDirection:RLMSyncProgressDirectionUpload
                                          mode:RLMSyncProgressModeForCurrentlyOutstandingWork
                                         block:^(RLMSyncProgress syncProgress) {
        NSLog(@"Uploaded %fB", (double)syncProgress.progressEstimate);
        // :remove-start:
        [expectation fulfill];
        // :remove-end:
    }];
    
    // Upload something
    [syncedRealm transactionWithBlock:^{
        [syncedRealm addObject:[[SyncObjcExamples_Task alloc] init]];
    }];
    // :snippet-end:
    (void)token;
    [self waitForExpectationsWithTimeout:20 handler:^(NSError *error) {
        NSLog(@"Expectation failed: %@", error);
    }];
}

- (void)testResetClientRealmFile {
    // :snippet-start: reset-client-realm-file
    @autoreleasepool {
        // all Realm usage here -- explicitly guarantee
        // that all realm objects are deallocated
        // before deleting the files
    }

    // Get configuration
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    RLMUser *user = [app currentUser];
    RLMRealmConfiguration *configuration = [user configurationWithPartitionValue:@"some partition value"];
    configuration.objectClasses = @[SyncObjcExamples_Task.class];

    NSError *error = nil;

    // Delete realm files for that configuration
    [RLMRealm deleteFilesForConfiguration:configuration
                                    error:&error];
    if (error) {
        // Handle error
    }
    // :snippet-end:
}

- (void)testSetClientLogLevel {
    // :snippet-start: set-log-level
    // Access your app
    RLMApp *app = [RLMApp appWithId:YOUR_APP_ID];
    
    // Access the sync manager for the app
    RLMSyncManager *syncManager = [app syncManager];
    
    // Set the logger to provide debug logs
    syncManager.logLevel = RLMSyncLogLevelDebug;
    // :snippet-end:
}

@end
// :replace-end:
