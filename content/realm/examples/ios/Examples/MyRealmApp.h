#ifndef RealmApp_h
#define RealmApp_h

#include <Realm/Realm.h>

static NSString *YOUR_APP_ID = @"example-testers-kvjdy";

@interface MyRealmApp : NSObject

+ (RLMApp *)app;

@end

#endif /* RealmApp_h */
