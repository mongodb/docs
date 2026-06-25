Starting in 1.3.0, {+c2c-product-name+} supports :ref:`capped
collections <manual-capped-collection>` with some limitations.

Starting in 1.20.0, you must pass the :option:`--enableCappedCollectionHandling` 
flag when starting ``mongosync`` to enable creating new capped 
collections during a migration.

- :dbcommand:`convertToCapped` is not supported. If you run
  ``convertToCapped``, ``mongosync`` exits with an error.
- :dbcommand:`cloneCollectionAsCapped` is not supported.

Capped collections on the source cluster work normally during sync.

Capped collections on the destination cluster have temporary changes
during sync:

- There is no maximum number of documents.
- The maximum collection size is 1PB.

``mongosync`` restores the original values for maximum number of
documents and maximum document size during commit.