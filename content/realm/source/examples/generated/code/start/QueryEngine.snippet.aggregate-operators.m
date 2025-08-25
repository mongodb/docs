NSLog(@"Projects with average tasks priority above 5: %lu",
      [[projects objectsWhere:@"tasks.@avg.priority > 5"] count]);

NSLog(@"Projects where all tasks are lower priority: %lu",
      [[projects objectsWhere:@"tasks.@max.priority < 5"] count]);

NSLog(@"Projects where all tasks are high priority: %lu",
      [[projects objectsWhere:@"tasks.@min.priority > 5"] count]);

NSLog(@"Projects with more than 5 tasks: %lu",
      [[projects objectsWhere:@"tasks.@count > 5"] count]);

NSLog(@"Long running projects: %lu",
      [[projects objectsWhere:@"tasks.@sum.progressMinutes > 100"] count]);
