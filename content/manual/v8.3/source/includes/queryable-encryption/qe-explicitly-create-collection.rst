.. important::

   Explicitly create your collection, rather than creating it implicitly
   with an insert operation. When you create a collection using
   ``createCollection()``, MongoDB creates an index on the encrypted
   fields. Without this index, queries on encrypted fields may run
   slowly.