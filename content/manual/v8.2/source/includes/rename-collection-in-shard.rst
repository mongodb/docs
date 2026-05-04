When renaming a sharded or unsharded collection in a sharded cluster,
the source and target collections are exclusively locked on every shard.
Subsequent operations on the source and target collections must wait
until the rename operation completes.