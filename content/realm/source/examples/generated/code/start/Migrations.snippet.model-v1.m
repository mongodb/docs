// In the first version of the app, the Person model
// has separate fields for first and last names,
// and an age property.
@interface Person : RLMObject
@property NSString *firstName;
@property NSString *lastName;
@property int age;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"firstName", @"lastName", @"age"];
}
@end
