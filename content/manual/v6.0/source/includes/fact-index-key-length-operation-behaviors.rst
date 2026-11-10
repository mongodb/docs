.. index-field-limit-ensureIndex

MongoDB will **not** create an index 
on a collection if the index entry for
an existing document exceeds the |limit|.

.. index-field-limit-reIndex

Reindexing operations will error if the index entry for an indexed
field exceeds the |limit|. Reindexing operations occur as part of the
:dbcommand:`compact` command as well
as the :method:`db.collection.reIndex()` method.

Because these operations drop *all* the indexes from a collection and
then recreate them sequentially, the error from the |limit| prevents
these operations from rebuilding any remaining indexes for the
collection.

.. index-field-limit-insert

MongoDB will not insert into an indexed collection any document with an
indexed field whose corresponding index entry would exceed the |limit|,
and instead, will return an error. Previous versions of MongoDB would
insert but not index such documents.

.. index-field-limit-update

Updates to the indexed field will error if the updated value causes the
index entry to exceed the |limit|.

If an existing document contains an indexed field whose index entry
exceeds the limit, *any* update that results in the relocation of that
document on disk will error.

.. index-field-limit-restore-import

:binary:`~bin.mongorestore` and :binary:`~bin.mongoimport` will not insert
documents that contain an indexed field whose corresponding index entry
would exceed the |limit|.

.. index-field-limit-rs-secondary

In MongoDB 2.6, secondary members of replica sets will continue to
replicate documents with an indexed field whose corresponding index
entry exceeds the |limit| on initial sync but will print warnings in
the logs.

Secondary members also allow index build and rebuild operations on a
collection that contains an indexed field whose corresponding index
entry exceeds the |limit| but with warnings in the logs.

With *mixed version* replica sets where the secondaries are version 2.6
and the primary is version 2.4, secondaries will replicate documents
inserted or updated on the 2.4 primary, but will print error messages
in the log if the documents contain an indexed field whose
corresponding index entry exceeds the |limit|.

.. index-field-limit-chunk-migration

For existing sharded collections, :doc:`chunk migration
</core/sharding-balancer-administration>` will fail if the chunk has a document
that contains an indexed field whose index entry exceeds the |limit|.
