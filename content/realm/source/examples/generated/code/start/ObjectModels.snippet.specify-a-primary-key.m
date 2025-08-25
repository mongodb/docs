@interface Project : RLMObject
@property NSInteger id; // Intended primary key
@property NSString *name;
@end

@implementation Project
// Return the name of the primary key property
+ (NSString *)primaryKey {
    return @"id";
}
@end
