The unique index constraints mean that:

- For a to-be-sharded collection, you cannot shard the collection if
  the collection has multiple unique indexes unless the shard key is the prefix for all the unique indexes. 

- For an already-sharded collection, you cannot create unique indexes
  on other fields unless the shard key is included as the prefix.

- A unique index stores a null value for a document missing the
  indexed field; that is a missing index field is treated as another
  instance of a ``null`` index key value. For more information, see
  :ref:`unique-index-and-missing-field`.