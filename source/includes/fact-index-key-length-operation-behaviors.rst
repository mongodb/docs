.. index-field-limit-ensureIndex

MongoDB will **not** :method:`create an index
<db.collection.ensureIndex()>` on a collection if the value of the
index field in an existing document exceeds the |limit|. Previous
versions of MongoDB would create the index but not index such documents.

.. index-field-limit-reIndex

Reindexing operations will error if an indexed field exceeds the
|limit|. Reindexing operations
occur as part of :dbcommand:`compact` and :dbcommand:`repairDatabase`
commands as well as the :method:`db.collection.reIndex()` method.

Because these operations drop *all* the indexes from a collection and
then recreate them sequentially, the error from the index key limit
prevents these operations from rebuilding any remaining indexes for the
collection and, in the case of the :dbcommand:`repairDatabase` command,
from continuing with the remainder of the process.

.. index-field-limit-insert

MongoDB will not insert into an indexed collection any document with an
indexed field value that exceeds the |limit|, and instead, will return
an error. Previous versions of MongoDB would insert but not index such
documents.

.. index-field-limit-update

Updates to the indexed field will error if the new value for the field
exceeds the |limit|.

If an existing document contains a value for the indexed field that
exceeds the limit, *any* update that results in the relocation of that
document on disk will error.

.. index-field-limit-restore-import

:program:`mongorestore` and :program:`mongoimport` will not insert
documents that contain indexed field value that exceeds the
|limit|.

.. index-field-limit-rs-secondary

In MongoDB 2.6, secondary members of replica sets will continue to
replicate documents with an indexed field value that exceeds the
|limit| on initial sync but will print warnings in the logs.

Secondary members also allow index build and rebuild operations on a
collection that contains an indexed field value that exceeds the
|limit| but with warnings in the logs.

With *mixed version* replica sets where the secondaries are version 2.6
and the primary is version 2.4, secondaries will replicate documents
inserted or updated on the 2.4 primary, but will print error messages
in the log if the documents contain indexed field value that exceeds the
|limit|.

.. index-field-limit-chunk-migration

For existing sharded collections, :doc:`chunk migration
</core/sharding-chunk-migration>` will fail if the chunk has a document
that contains an indexed field value that exceeds the |limit|.
