The value of ``off`` is only valid when you set the collection-level
``expireAfterSeconds`` property with :dbcommand:`collMod`. If you
created a TTL index with the :method:`db.collection.createIndex()`
method, you must specify an integer value for ``expireAfterSeconds`` for
that index. 
