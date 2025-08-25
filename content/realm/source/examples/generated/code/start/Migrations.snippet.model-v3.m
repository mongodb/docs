// In version 3, the Person model has one
// combined field for the full name and age as a String. 
// A manual migration will be required to convert from 
// version 2 to this version.
@interface Person : RLMObject
@property NSString *fullName;
@property NSString *age;
@end

@implementation Person
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"fullName", @"age"];
}
@end
