@interface Book : RLMObject
@property int priceCents;
@property NSString *title;
@end

@implementation Book
// Return a list of indexed property names
+ (NSArray *)indexedProperties {
    return @[@"title"];
}
@end
