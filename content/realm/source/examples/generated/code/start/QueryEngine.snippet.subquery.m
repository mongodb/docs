NSPredicate *predicate = [NSPredicate predicateWithFormat:
                          @"SUBQUERY(tasks, $task, $task.isComplete == %@ AND $task.assignee == %@).@count > 0",
                          @NO,
                          @"Alex"];
NSLog(@"Projects with incomplete tasks assigned to Alex: %lu",
  [[projects objectsWithPredicate:predicate] count]);
