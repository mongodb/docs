
:red:`WARNING:`

The |cmd| command with ``forceJumbo=true`` blocks write
operations on the collection.

This option causes the shard to migrate chunks even when they
are larger than the configured chunk size. The collection
remains unavailable for writes for the duration of the
migration.

To migrate these large chunks without this long blocking period,
see :ref:`balance-chunks-that-exceed-size-limit` instead.
