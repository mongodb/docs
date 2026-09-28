.. |Clustered-collections| replace:: Clustered collections

|Clustered-collections| store documents in index order rather than the 
natural order typical of traditional collections. Clustered collections
store documents in one :ref:`WiredTiger <storage-wiredtiger>` file
ordered according to the index specification, instead of requiring a
separate index file for the default ``_id`` index.

Storing the collection's documents in index order can provide benefits 
for storage and performance compared to traditional collections and 
their related regular indexes.

Clustered collections are created with a :ref:`clustered index
<db.createCollection.clusteredIndex>`. The clustered index specifies the
order in which documents are stored.

To create a clustered collection, see
:ref:`clustered-collections-examples`.