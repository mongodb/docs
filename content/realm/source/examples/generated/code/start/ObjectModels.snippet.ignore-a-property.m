@interface Person : RLMObject
@property NSInteger tmpId;
@property (readonly) NSString *name; // read-only properties are automatically ignored
@property NSString *firstName;
@property NSString *lastName;
@end

@implementation Person
+ (NSArray *)ignoredProperties {
    return @[@"tmpId"];
}
- (NSString *)name {
    return [NSString stringWithFormat:@"%@ %@", self.firstName, self.lastName];
}
@end
