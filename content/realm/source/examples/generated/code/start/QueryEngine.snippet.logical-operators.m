NSLog(@"Ali's complete tasks: %lu",
  [[tasks objectsWhere:@"assignee == 'Ali' AND isComplete == true"] count]);
