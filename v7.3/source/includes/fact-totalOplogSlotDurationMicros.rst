Starting in MongoDB 7.0 (and 6.0.13, 5.0.24), the 
``totalOplogSlotDurationMicros`` in the slow query log message shows the 
time between a write operation getting a commit timestamp to commit the 
storage engine writes and actually committing. ``mongod`` supports 
parallel writes. However, it commits write operations with commit 
timestamps in any order. 
