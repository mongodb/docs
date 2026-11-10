Starting in MongoDB 5.2, you can use |drop-index| to drop existing 
indexes on the same collection even if there is a build in progress on 
another index. In earlier versions, attempting to drop a different 
index during an in-progress index build results in a 
``BackgroundOperationInProgressForNamespace`` error.    
