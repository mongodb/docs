@interface MySyncSessionObserver: NSObject
@end

@implementation MySyncSessionObserver
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if (![object isKindOfClass:RLMSyncSession.class]) {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
        return;
    }
    if (![keyPath isEqualToString:@"connectionState"]) {
        // Not interested in observing this keypath
        return;
    }
    RLMSyncSession *syncSession = (RLMSyncSession *)object;
    RLMSyncConnectionState connectionState = [syncSession connectionState];
    switch (connectionState) {
        case RLMSyncConnectionStateConnecting:
            NSLog(@"Connecting...");
            break;
        case RLMSyncConnectionStateConnected:
            NSLog(@"Connected");
            break;
        case RLMSyncConnectionStateDisconnected:
            NSLog(@"Disconnected");
            break;
    }
}
@end
