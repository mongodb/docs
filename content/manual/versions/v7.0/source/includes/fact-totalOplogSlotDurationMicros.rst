The ``totalOplogSlotDurationMicros`` in the slow query log message shows the 
time between a write operation getting a commit timestamp to commit the 
storage engine writes and actually committing. ``mongod`` supports 
parallel writes. However, it commits write operations with commit 
timestamps in any order. 
