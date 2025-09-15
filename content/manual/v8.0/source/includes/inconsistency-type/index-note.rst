
By default, the method does not check indexes for consistency across the shards.
Index checks can return false positive inconsistencies if they run concurrent
with operations that create, delete, or modify indexes.  To check indexes
with this method, set the ``checkIndexes`` option.

