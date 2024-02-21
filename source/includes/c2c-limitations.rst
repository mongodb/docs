
- The |fcv| for source and destination {+cluster+}\s is at least {+c2c-version+}
  and is the same on source and destination {+cluster+}\s.
- You can't run this live migration procedure for source or destination
  {+clusters+} with MongoDB versions earlier than MongoDB {+c2c-version+}. To learn more,
  see :manual:`Server Release Notes </release-notes/6.0/>`.
- This live migration procedure doesn't support MongoDB rapid releases,
  such as 6.1 or 6.2. Only major MongoDB releases, such as 6.0.x (starting
  from {+c2c-version+} and later) are supported. To learn more,
  see :manual:`MongoDB versioning </reference/versioning>`.
- You can't use {+Serverless-instances+} as destination {+clusters+}.
- You can't select an ``M0`` (Free Tier) or ``M2/M5`` shared {+cluster+} as the
  source or destination for live migration. To migrate data from an
  ``M0`` (Free Tier) or ``M2/M5`` shared {+cluster+} to a paid {+cluster+},
  :doc:`change the cluster tier and type </scale-cluster>`.
- You can't live migrate using this migration procedure to |a-service|
  destination {+cluster+} that has |bic| enabled.

- .. include:: /includes/fact-live-migration-host-alerts.rst

- :manual:`Time series collections </core/timeseries-collections/>` are not supported.
  The migration process skips any time series collections on the source {+cluster+}.
- Clustered collections with :manual:`expireAfterSeconds </reference/method/db.createCollection/#std-label-db.createCollection.expireAfterSeconds>`
  set aren't supported.
- :manual:`convertToCapped </reference/command/convertToCapped/#mongodb-dbcommand-dbcmd.convertToCapped>`
  and :manual:`cloneCollectionAsCapped </reference/command/cloneCollectionAsCapped/#mongodb-dbcommand-dbcmd.cloneCollectionAsCapped>`
  commands aren't supported.
- If in your source {+cluster+} you used :manual:`applyOps </reference/command/applyOps/>`
  operations, they aren't supported on the destination {+cluster+}.
- Documents that have dollar ($) prefixed field names aren't supported.
  See :manual:`Field Names with Periods and Dollar Signs </core/dot-dollar-considerations/#std-label-crud-concepts-dot-dollar-considerations>`.
- :manual:`Queryable Encryption </core/queryable-encryption/>` is not supported.
- You can't sync a collection that has a unique index and a non-unique index
  defined on the same fields.
- Within a collection, the ``_id`` field must be unique across all of the
  shards in the {+cluster+}. To learn more, see :manual:`Sharded Clusters and Unique Indexes
  </core/index-unique/#std-label-sharded-clusters-unique-indexes>`.
- You can't sync a collection with any documents that have an empty timestamp,
  such as ``Timestamp(0,0)``.
- You can't use the :manual:`movePrimary </reference/command/movePrimary/#mongodb-dbcommand-dbcmd.movePrimary>`
  command to reassign the primary shard while running this live migration process.
- This live migration process only migrates indexes that exist on all shards
  and that have consistent specs on all shards.
- You can't :manual:`refine </core/sharding-refine-a-shard-key/#std-label-shard-key-refine>`
  a shard key while running this live migration process.
- You can't modify the shard key using :manual:`reshardCollection </reference/command/reshardCollection/#mongodb-dbcommand-dbcmd.reshardCollection>`
  during this live migration process.
- The maximum number of :manual:`shard key indexes </core/sharding-shard-key/#std-label-sharding-shard-key-indexes>`
  is one lower than normal, 63 instead of 64.
- You can't use this live migration process to sync one source {+cluster+} to
  many destination {+clusters+}.
- Network compression isn't supported.
- This live migration process replicates data, it doesn't replicate zone configuration.
- :manual:`System collections </reference/system-collections/#std-label-metadata-system-collections>`
  aren't replicated with this live migration process.
- If you issue a :manual:`dropDatabase </reference/command/dropDatabase/#mongodb-dbcommand-dbcmd.dropDatabase>`
  command on the source {+cluster+}, this change isn't directly applied on
  the destination {+cluster+}. Instead, this live migration process drops
  user collections and views in the database on the destination {+cluster+},
  but it doesn't drop system collections on that database.
  For example, on the destination {+cluster+}, the drop operation doesn't
  affect a user-created :manual:`system.js </reference/system-collections/#mongodb-data--database-.system.js>`
  collection. If you enable profiling, the :manual:`system.profile </reference/system-collections/#mongodb-data--database-.system.profile>`
  collection remains. If you create views on the source {+cluster+} and then
  drop the database, replicating the drop with this live migration process
  removes the views, but leaves an empty
  :manual:`system.views </reference/system-collections/#mongodb-data--database-.system.views>`
  collection. In these cases, the live migration of the ``dropDatabase``
  results removes all user-created collections from the database, but leaves
  its system collections on the destination {+cluster+}.
