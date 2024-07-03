If an operation inserts a large amount of random data (for example,
hashed indexes) on an indexed field, insert performance may decrease.
Bulk inserts of random data create random index entries, which increase
the size of the index. If the index reaches the size that requires each
random insert to access a different index entry, the inserts result in a
high rate of WiredTiger cache eviction and replacement. When this
happens, the index is no longer fully in cache and is updated on disk,
which decreases performance.

To improve the performance of bulk inserts of random data on indexed
fields, you can either: 

- Drop the index, then recreate it after you insert the random data.
- Insert the data into an empty unindexed collection.

Creating the index after the bulk insert sorts the data in memory and
performs an ordered insert on all indexes. 