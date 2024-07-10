For the WiredTiger storage engine, only the ``full`` validation process will 
force a checkpoint and flush all in-memory data to disk before verifying the 
on-disk data.
