// Observe connectionState for changes using KVO
MySyncSessionObserver *observer = [[MySyncSessionObserver alloc] init];
[syncSession addObserver:observer
              forKeyPath:@"connectionState"
                 options:NSKeyValueObservingOptionInitial
                 context:nil];

// Later, when done...
[syncSession removeObserver:observer
                 forKeyPath:@"connectionState"
                    context:nil];

