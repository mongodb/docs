// In a new version, you add a property
// on the Person model.
@interface Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
// Add a new "email" property.
@property NSString *email;
// New properties can be migrated
// automatically, but must update the schema version.
@property int age;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName", @"email", @"age"];
}
@end
