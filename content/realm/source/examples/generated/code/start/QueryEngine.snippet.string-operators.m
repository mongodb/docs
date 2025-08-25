// Use [c] for case-insensitivity.
NSLog(@"Projects that start with 'e': %lu",
  [[projects objectsWhere:@"name BEGINSWITH[c] 'e'"] count]);

NSLog(@"Projects that contain 'ie': %lu",
  [[projects objectsWhere:@"name CONTAINS 'ie'"] count]);
