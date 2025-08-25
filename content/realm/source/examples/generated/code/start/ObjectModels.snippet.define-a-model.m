// A dog has an _id primary key, a string name, an optional
// string breed, and a date of birth.
@interface Dog : RLMObject
@property RLMObjectId *_id;
@property NSString *name;
@property NSString *breed;
@property NSDate *dateOfBirth;
@end

@implementation Dog
+ (NSString *)primaryKey {
    return @"_id";
}

+ (NSArray<NSString *> *)requiredProperties {
    return @[
        @"_id", @"name", @"dateOfBirth"
    ];
}
@end
