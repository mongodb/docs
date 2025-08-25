#import "MyRealmApp.h"
// :snippet-start: import-realm
#include <Realm/Realm.h>
// :snippet-end:
@implementation MyRealmApp

+ (RLMApp *)app {
    static RLMApp *app = nil;
    @synchronized(self) {
        if (app == nil) { 
            app = [RLMApp appWithId:YOUR_APP_ID];
        }
    }
    return app;    
}

@end
