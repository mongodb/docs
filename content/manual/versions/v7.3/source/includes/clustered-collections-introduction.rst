Clustered collections store indexed documents in the same
:ref:`WiredTiger <storage-wiredtiger>` file as the index specification.
Storing the collection's documents and index in the same file provides
benefits for storage and performance compared to regular indexes.

Clustered collections are created with a :ref:`clustered index
<db.createCollection.clusteredIndex>`. The clustered index specifies the
order in which documents are stored.

To create a clustered collection, see
:ref:`clustered-collections-examples`.
