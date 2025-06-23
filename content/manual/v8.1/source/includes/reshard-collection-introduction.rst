In a collection resharding operation, a shard can be a:

- **donor**, which currently stores :term:`chunks <chunk>` for the
  sharded collection.
- **recipient**, which stores new chunks for the sharded collection
  based on the :term:`shard keys <shard key>` and :ref:`zones
  <zone-sharding>`.

A shard can be donor and a recipient at the same time.

The config server primary is always the resharding coordinator and
starts each phase of the resharding operation.
