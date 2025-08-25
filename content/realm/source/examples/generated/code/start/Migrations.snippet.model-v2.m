// In version 2, the Person model has one
// combined field for the full name and age as a Int. 
// A manual migration will be required to convert from 
// version 1 to this version.
@interface Person : RLMObject
@property NSString *fullName;
@property int age;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"fullName", @"age"];
}
@end
