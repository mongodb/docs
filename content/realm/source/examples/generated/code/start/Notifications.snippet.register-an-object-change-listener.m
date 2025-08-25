@interface Dog : RLMObject
@property NSString *name;
@property int age;
@end

@implementation Dog
@end

RLMNotificationToken *objectNotificationToken = nil;

void objectNotificationExample() {
    Dog *dog = [[Dog alloc] init];
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
