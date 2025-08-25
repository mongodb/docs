// In a new version, you remove a property
// on the Person model.
@interface Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
// Remove the "age" property.
// @property int age;
// Removed properties can be migrated
// automatically, but must update the schema version.
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName"];
}
@end
