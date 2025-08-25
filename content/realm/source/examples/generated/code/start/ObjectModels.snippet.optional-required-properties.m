@interface Person : RLMObject
// Required property - included in `requiredProperties`
// return value array
@property NSString *name;

// Optional string property - not included in `requiredProperties`
@property NSString *address;

// Required numeric property
@property int ageYears;

// Optional numeric properties use NSNumber tagged
// with RLMInt, RLMFloat, etc.
@property NSNumber<RLMFloat> *heightCm;
@end

@implementation Person
// Specify required pointer-type properties here.
// Implicitly required properties (such as properties
// of primitive types) do not need to be named here.
+ (NSArray<NSString *> *)requiredProperties {
    return @[@"name"];
}
@end
