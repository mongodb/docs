Starting in MongoDB 6.2, you must set ``value`` between 1 and 1024 (inclusive) 
when inserting or updating documents with the ``_id: chunksize`` field in the 
:data:`config.settings` collection. If you specify an invalid ``value``, 
MongoDB returns a schema validation error. 

Any ``value`` fields outside the range of 1 to 1024 MB (inclusive) set prior to 
MongoDB 6.2 remain unchanged.
