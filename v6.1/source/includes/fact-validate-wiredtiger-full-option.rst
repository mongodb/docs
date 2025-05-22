Starting in MongoDB 3.6, for the WiredTiger storage engine, only the
``full`` validation process will force a checkpoint and flush all
in-memory data to disk before verifying the on-disk data.

In previous versions, the data validation process for the WT storage engine
always forces a checkpoint.
