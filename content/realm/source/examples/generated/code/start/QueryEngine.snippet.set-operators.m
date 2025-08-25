NSLog(@"Projects with no complete tasks: %lu",
  [[projects objectsWhere:@"NONE tasks.isComplete == true"] count]);

NSLog(@"Projects with any top priority tasks: %lu",
  [[projects objectsWhere:@"ANY tasks.priority == 10"] count]);
