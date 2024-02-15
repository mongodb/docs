If you are migrating a replica set to a sharded {+cluster+}:

- If you'd like to shard collections, click the checkmark in
  :guilabel:`Include sharding parameters` and paste your sharding configuration
  JSON into the text box using the :ref:`sharding example <c2c-example-shards-live-migration>`.
  Save this configuration in a file externally, in case you would like to
  refer to it later.

  The sharding configuration JSON defines the ``shardingEntries`` array,
  which specifies the collections to shard, and the keys to use for sharding.
  MongoDB shards only those collections that you include into this array.
  To learn more, see :manual:`Sharding </sharding>`.

  If you omit specifying the sharding configuration, you can shard collections
  on the destination {+cluster+} after you migrate your {+cluster+} to |service|.

- In addition to the sharding configuration, a compatible index for the
  specified sharding keys must exist on the destination {+cluster+} in service.

  Click the checkmark in :guilabel:`Create supporting indexes` so that
  MongoDB automatically creates supporting shard key indexes on the
  destination {+cluster+} in |service|.
