.. versionchanged:: 8.2

During the apply and catch-up phase:

- Each recipient shard begins applying oplog entries that were written
  to the the corresponding donor shard after the recipient cloned the data. 
- When the estimate for the time remaining to complete the resharding
  operation is under **500 ms**, the donor shard blocks
  writes on the source collection.