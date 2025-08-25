// :replace-start: {
//   "terms": {
//     "NotificationsObjcExamples_": ""
//   }
// }
#import <XCTest/XCTest.h>
#import <Realm/Realm.h>

// :snippet-start: register-an-object-change-listener
@interface NotificationsObjcExamples_Dog : RLMObject
@property NSString *name;
@property int age;
@end

@implementation NotificationsObjcExamples_Dog
@end

RLMNotificationToken *objectNotificationToken = nil;

void objectNotificationExample() {
    NotificationsObjcExamples_Dog *dog = [[NotificationsObjcExamples_Dog alloc] init];
    dog.name = @"Max";
    dog.age = 3;
    
    // Open the default realm
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^{
        [realm addObject:dog];
    }];

    // Observe object notifications. Keep a strong reference to the notification token
    // or the observation will stop. Invalidate the token when done observing.
    objectNotificationToken = [dog addNotificationBlock:^(BOOL deleted, NSArray<RLMPropertyChange *> * _Nullable changes, NSError * _Nullable error) {
        if (error != nil) {
            NSLog(@"An error occurred: %@", [error localizedDescription]);
            return;
        }
        if (deleted) {
            NSLog(@"The object was deleted.");
            return;
        }
        NSLog(@"Property %@ changed to '%@'",
              changes[0].name,
              changes[0].value);
    }];
    
    // Now update to trigger the notification
    [realm transactionWithBlock:^{
        dog.name = @"Wolfie";
    }];

}
// :snippet-end:

// :snippet-start: register-a-collection-change-listener
@interface CollectionNotificationExampleViewController : UITableViewController
@end

@implementation CollectionNotificationExampleViewController {
    RLMNotificationToken *_notificationToken;
}
- (void)viewDidLoad {
    [super viewDidLoad];

    // Observe RLMResults Notifications
    __weak typeof(self) weakSelf = self;
    _notificationToken = [[NotificationsObjcExamples_Dog objectsWhere:@"age > 5"]
      addNotificationBlock:^(RLMResults<NotificationsObjcExamples_Dog *> *results, RLMCollectionChange *changes, NSError *error) {
        
        if (error) {
            NSLog(@"Failed to open realm on background worker: %@", error);
            return;
        }

        UITableView *tableView = weakSelf.tableView;
        // Initial run of the query will pass nil for the change information
        if (!changes) {
            [tableView reloadData];
            return;
        }

        // Query results have changed, so apply them to the UITableView
        [tableView performBatchUpdates:^{
            // Always apply updates in the following order: deletions, insertions, then modifications.
            // Handling insertions before deletions may result in unexpected behavior.
            [tableView deleteRowsAtIndexPaths:[changes deletionsInSection:0]
                             withRowAnimation:UITableViewRowAnimationAutomatic];
            [tableView insertRowsAtIndexPaths:[changes insertionsInSection:0]
                             withRowAnimation:UITableViewRowAnimationAutomatic];
            [tableView reloadRowsAtIndexPaths:[changes modificationsInSection:0]
                             withRowAnimation:UITableViewRowAnimationAutomatic];
        } completion:^(BOOL finished) {
            // ...
        }];
    }];
}
@end
// :snippet-end:

@interface NotificationsObjc : XCTestCase
@end

@implementation NotificationsObjc
- (void)tearDown {
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^{
        [realm deleteAllObjects];
    }];
}

- (void)testObjectNotificationExample {
    objectNotificationExample();
}

- (void)testSilentWrite {
    // :snippet-start: silent-write
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Observe realm notifications
    RLMNotificationToken *token = [realm addNotificationBlock:^(RLMNotification  _Nonnull notification, RLMRealm * _Nonnull realm) {
        // ... handle update
    }];
    
    // Later, pass the token in an array to the realm's `-transactionWithoutNotifying:block:` method.
    // Realm will _not_ notify the handler after this write.
    [realm transactionWithoutNotifying:@[token] block:^{
       // ... write to realm
    }];
    
    // Finally
    [token invalidate];
    // :snippet-end:
}

- (void)testRealmNotification {
    // :snippet-start: register-a-realm-change-listener
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Observe realm notifications. Keep a strong reference to the notification token
    // or the observation will stop.
    RLMNotificationToken *token = [realm addNotificationBlock:^(RLMNotification  _Nonnull notification, RLMRealm * _Nonnull realm) {
        // `notification` is an enum specifying what kind of notification was emitted.
        // ... update UI ...
    }];
    
    // ...

    // Later, explicitly stop observing.
    [token invalidate];
    // :snippet-end:
}

- (void)testStopWatching {
    // :snippet-start: stop-watching
    RLMRealm *realm = [RLMRealm defaultRealm];
    
    // Observe and obtain token
    RLMNotificationToken *token = [realm addNotificationBlock:^(RLMNotification  _Nonnull notification, RLMRealm * _Nonnull realm) {
        /* ... */
    }];

    // Stop observing
    [token invalidate];
    // :snippet-end:
}

@end

// :replace-end:
